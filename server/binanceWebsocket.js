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
const {logger} = require("./logging")
const { coinModel, staticCoinModel } = require("./coins");
const {convertData} = require("./convertData");

// Set up Express middleware
const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Initialize index for generating unique coinId
let index = 1;

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
    logger.info('A client connected');

    // Establish WebSocket connection with Binance
    const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    // Handle messages from Binance WebSocket
    binanceWebSocket.on('message', async (data) => {
        try {
            // Parse received data
            const tickerData = JSON.parse(data);

            // Process ticker data
            for (let i = 0; i < tickerData.length; i++) {
                tickerData[i] = convertData(tickerData[i]); // Convert the data

                let temp = {
                    tradingPair: tickerData[i].tradingPair
                }

                // Check if the coin exists in the database
                let existingCoin = await staticCoinModel.find(temp);

                if (existingCoin.length === 0) {
                    temp.coinId = index++;
                    // If the coin doesn't exist, insert it into the database
                    await staticCoinModel.insertMany(temp);
                }

                // Set the coinId
                tickerData[i].coinId = !existingCoin.length === 0 ? existingCoin.coinId : temp.coinId;
            }

            // Store tickerData in the database
            await coinModel.insertMany(tickerData);

            // Compress tickerData
            const compressedData = pako.deflate(JSON.stringify(tickerData), { to: 'string' });

            // Send compressed data to the WebSocket client
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
