/**
 * Creates an Express server that listens on a specified port and establishes a WebSocket connection with Binance.
 * The server receives ticker data from Binance WebSocket API, processes it, stores it in a MongoDB database,
 * and sends compressed ticker data to WebSocket clients.
 * 
 * @module main
 * @requires express
 * @requires body-parser
 * @requires http
 * @requires ws
 * @requires pako
 * @requires logging
 * @requires coins
 * @requires convertData
 */

// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const pako = require('pako');

// Import custom modules
const {logger} = require("./logging.js")
const { coinModel, staticCoinModel } = require("./coins");
const {convertData} = require("./convertData");

require('dotenv').config();

// Set up Express middleware
const PORT = process.env.WS_PORT || 6000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Initialize index for generating unique coinId
let index = 1;

let coinCache = {}; // Cache to store coin data in memory
let tickerBuffer = [];

setInterval(async () => {
    if (tickerBuffer.length > 0) {
        await coinModel.insertMany(tickerBuffer);
        tickerBuffer = []; // Reset buffer
    }
}, 1000); // Adjust the interval based on traffic

async function loadCoinCache() {
    const coins = await staticCoinModel.find({});
    coins.forEach(coin => {
        coinCache[coin.tradingPair] = coin.coinId;
    });
}

loadCoinCache(); // Load cache at startup



// Handle WebSocket connections
wss.on('connection', (ws, req) => {
    logger.info('A client connected');

    // Establish WebSocket connection with Binance
    const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    binanceWebSocket.on('message', async (data) => {
        try {
            const tickerData = JSON.parse(data);
            for (let i = 0; i < tickerData.length; i++) {
                tickerData[i] = convertData(tickerData[i]);
                const { tradingPair } = tickerData[i];
                
                if (!coinCache[tradingPair]) {
                    const newCoin = { tradingPair, coinId: index++ };
                    coinCache[tradingPair] = newCoin.coinId;
                    await staticCoinModel.insertMany(newCoin);
                }
    
                tickerData[i].coinId = coinCache[tradingPair];
            }
    
            await coinModel.insertMany(tickerData);
    
            const compressedData = pako.deflate(JSON.stringify(tickerData), { to: 'string' });
            ws.send(compressedData, { binary: true });
        } catch (error) {
            logger.error('Error parsing response data:', error);
        }
    });
    

    // Handle errors from Binance WebSocket
    binanceWebSocket.on('error', (error) => {
        logger.error('Binance WebSocket error:', error);
    });

    // Handle messages from WebSocket clients
    ws.on('message', (message) => {
        logger.info(`Received from client:${message}`);
    });

    // Handle WebSocket client disconnection
    ws.on('close', () => {
        logger.info('Client disconnected');
        binanceWebSocket.close();
    });
});

// Create HTTP server
const server = http.createServer(app);

// Handle WebSocket upgrade requests
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// Start HTTP server
server.listen(PORT, () => {
    logger.info(`Server works on PORT ${PORT}`);
});
