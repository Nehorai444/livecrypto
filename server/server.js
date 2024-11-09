/**
 * Express server script for handling requests related to cryptocurrency data search.
 * 
 * This script sets up an Express server to serve static files, parse incoming request bodies,
 * and handle API requests to search for cryptocurrency data within a specified date range.
 * 
 * @module server
 * @requires express
 * @requires body-parser
 * @requires path
 * @requires logging
 * @requires coins
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { logger } = require("./logging");

// Import the coinModel and staticCoinModel from the coins.js file
const { coinModel, staticCoinModel } = require("./coins");
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 8080;
// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * POST route to handle searching for cryptocurrency data.
 * 
 * @name POST /api/searchCoinData
 * @function
 * @memberof server
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/api/searchCoinData', async (req, res) => {
  try {
    const { startDate, endDate, coinName } = req.body;

    // Parse the startDate and endDate into JavaScript Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Check if the parsed dates are valid
    if (!parsedStartDate || !parsedEndDate || !coinName) {
      logger.error(`Data from the client not arrived`);

      // If the parsed dates are invalid, return an error
      return res.status(400).json({ status: 0, data: [], errors: ['Please provide valid startDate, endDate, and coinName.'] });
    }

    const query = {
      'eventTimestamp': { $gte: parsedStartDate, $lte: parsedEndDate },
      'tradingPair': coinName,
    };

    // Find the coin data in the database
    const coinData = await coinModel.find(query);

    if (coinData.length > 0) {
      logger.info(`The user gets data about ${coinName}.`);

      // If the coin data is found, return it to the client
      res.status(200).json({ status: 1, data: coinData, errors: [] });
    }
  } catch (error) {
    logger.error('Error searching for coin data:', error);
    res.status(500).json({ status: 0, data: [], errors: ['An error occurred while searching for coin data.'] });
  }
});

/**
 * GET route to serve the React client application.
 * 
 * @name GET *
 * @function
 * @memberof server
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  logger.info('Server works on PORT 8080');
});
