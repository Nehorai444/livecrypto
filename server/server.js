const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const winston = require('winston');

const { coinModel, staticCoinModel } = require("./coins");

const PORT = 8080;
const URL = 'mongodb+srv://nehorai444:5wCw23dp4TWgIyyM@cluster0.mgyu73p.mongodb.net/coinWebSocket';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// db.connect(URL).then(() => {
//     console.log('DB is on')
// });

app.use(express.static(path.join(__dirname, '../mern/build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/searchCoinData', async (req, res) => {
  try {
    const { startDate, endDate, coinName } = req.body;

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (!parsedStartDate || !parsedEndDate || !coinName) {
      logger.error('Invalid input parameters.');
      return res.status(400).json({ status: 0, data: [], errors: ['Please provide valid startDate, endDate, and coinName.'] });
    }

    const query = {
      'eventTimestamp': { $gte: parsedStartDate, $lte: parsedEndDate },
      'tradingPair': coinName,
    };
    const coinData = await coinModel.find(query);
    logger.info('Coin data:', coinData);

    if (coinData.length > 0) res.status(200).json({ status: 1, data: coinData, errors: [] });
  } catch (error) {
    logger.error('Error searching for coin data:', error);
    res.status(500).json({ status: 0, data: [], errors: ['An error occurred while searching for coin data.'] });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../mern/build', 'index.html'))
});

app.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`);
});
