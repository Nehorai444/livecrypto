// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const pako = require('pako');
const path = require('path');
require('dotenv').config();

// Import custom modules (assuming you have these modules implemented)
const { logger } = require("./logging");
const { coinModel, staticCoinModel } = require("./coins");
const { convertData } = require("./convertData");
const app = express();

const cors = require('cors');

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors()); // allow all domains, or configure it to allow only specific domains


// Parse incoming request bodies as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create the HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// Handle HTTP WebSocket upgrade requests
server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

// Cache to store coin data in memory and buffer for bulk insertion into MongoDB
let coinCache = {};
let tickerBuffer = [];
let index = 1; // Unique ID generator for new coins

// Bulk insert cached data to MongoDB every second
setInterval(async () => {
  if (tickerBuffer.length > 0) {
    await coinModel.insertMany(tickerBuffer);
    tickerBuffer = []; // Reset buffer after insertion
  }
}, 1000);

// Load initial cache from MongoDB at startup
async function loadCoinCache() {
  const coins = await staticCoinModel.find({});
  coins.forEach(coin => {
    coinCache[coin.tradingPair] = coin.coinId;
  });
}
loadCoinCache(); // Initial call to populate the cache

// Connect to Binance WebSocket API
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

    // Broadcast the data to all connected clients
    const compressedData = pako.deflate(JSON.stringify(tickerData), { to: 'string' });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(compressedData, { binary: true });
      }
    });
  } catch (error) {
    logger.error('Error parsing response data:', error);
  }
});

binanceWebSocket.on('error', (error) => logger.error('Binance WebSocket error:', error));

// Handle WebSocket connections for users
wss.on('connection', (ws) => {
  logger.info('A client connected');

  ws.on('close', () => {
    logger.info('A client disconnected');
  });
});


// API endpoint for searching cryptocurrency data within a date range
app.post('/api/searchCoinData', async (req, res) => {
  try {
    const { startDate, endDate, coinName } = req.body;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (!parsedStartDate || !parsedEndDate || !coinName) {
      logger.error('Invalid request parameters');
      return res.status(400).json({ status: 0, errors: ['Invalid request parameters'] });
    }

    const query = { eventTimestamp: { $gte: parsedStartDate, $lte: parsedEndDate }, tradingPair: coinName };
    const coinData = await coinModel.find(query);

    if (coinData.length > 0) {
      logger.info(`Data found for ${coinName}`);
      return res.status(200).json({ status: 1, data: coinData, errors: [] });
    } else {
      return res.status(404).json({ status: 0, errors: [`No data found for ${coinName}`] });
    }
  } catch (error) {
    logger.error('Error searching for coin data:', error);
    return res.status(500).json({ status: 0, errors: ['Internal server error'] });
  }
});

// Catch-all route to serve the React client from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server and listen on the specified port
server.listen(process.env.PORT, () => {
  logger.info(`Express server running on PORT ${process.env.PORT}`);
});