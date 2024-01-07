const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const { coinModel, staticCoinModel } = require("./coins");
const {convertData} = require("./convertData");

const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const wss = new WebSocket.Server({ noServer: true });

let index = 1;
wss.on('connection', (ws, req) => {
    console.log('A client connected');

    // Update the WebSocket URL to listen to the 'All Market Mini Tickers' stream
    const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    binanceWebSocket.on('message', async (data) => {
        // Parse the data received from the WebSocket
        try {
            const tickerData = JSON.parse(data);
            for (let i = 0; i < tickerData.length; i++) {
                tickerData[i] = convertData(tickerData[i]);
                let temp = {
                    tradingPair: tickerData[i].tradingPair
                }
                let existingCoin = await staticCoinModel.find(temp);
                if (existingCoin.length === 0) {
                    temp.coinId = index;
                    ++index;
                    await staticCoinModel.insertMany(temp)
                }
                tickerData[i].coinId = !existingCoin.length === 0? existingCoin.coinId: temp.coinId;
            }
            // Send the tickerData to the WebSocket client
            await coinModel.insertMany(tickerData);
            ws.send(JSON.stringify(tickerData));
        } catch (error) {
            console.error('Error parsing response data:', error);
        }
    });

    binanceWebSocket.on('error', (error) => {
        console.error('Binance WebSocket error:', error);
    });

    ws.on('message', (message) => {
        // Handle client messages if needed
        console.log(`Received from client:${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        binanceWebSocket.close();
    });
});



const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});


server.listen(PORT, () => {
    console.log('Server works on PORT 4000');
});
