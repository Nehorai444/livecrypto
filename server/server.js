const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const {logger} = require("./logging")

// Import the coinModel and staticCoinModel from the coins.js file
const { coinModel, staticCoinModel } = require("./coins");

const PORT = 8080;

app.use(express.static(path.join(__dirname, '../mern/build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/searchCoinData', async (req, res) => {
  try {
    const { startDate, endDate, coinName } = req.body;

    // Parse the startDate and endDate into JavaScript Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Check if the parsed dates are valid
    if (!parsedStartDate || !parsedEndDate || !coinName) {
      logger.error(`Data from the client not arrived`)

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
      logger.info(`The user gets data about ${coinName}.`)

      // If the coin data is found, return it to the client
      res.status(200).json({ status: 1, data: coinData, errors: [] })
    };
  } catch (error) {
    logger.error('Error searching for coin data:', error);
    res.status(500).json({ status: 0, data: [], errors: ['An error occurred while searching for coin data.'] });
  }
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../mern/build', 'index.html'))
})

app.listen(PORT, () => {
  logger.info('Server works on PORT 8080');
});
