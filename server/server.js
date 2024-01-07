const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('mongoose');

const { coinModel, staticCoinModel } = require("./coins");

const PORT = 8080;
const URL = 'mongodb+srv://nehorai444:5wCw23dp4TWgIyyM@cluster0.mgyu73p.mongodb.net/coinWebSocket';

// db.connect(URL).then(() => {
//     console.log('DB is on')
// });

app.use(express.static(path.join(__dirname, '../mern/build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/search", async (req, res) => {
  try {
    let { searchInpt } = req.body;
    let existingCoins = await staticCoinModel.find({ tradingPair: { $regex: new RegExp(searchInpt) } }).limit(10);
    console.log(existingCoins)
    if (existingCoins.length === 0) res.json({ status: 0, data: [], errors: ["Coin not found"] })
    else {
      let temp = await coinModel.find({ coinId: 1 })
      .sort({ eventTimestamp: -1 })
      console.log(temp);
      let coinsArr = existingCoins.map(async (val) => {
        return await coinModel.find({ coinId: val.coinId })
          .sort({ eventTimestamp: -1 })// Sort by "date" property in descending order
      });

      res.json({ status: 1, data: coinsArr, errors: [] })
    }
  } catch (error) {
    console.error('Error while searching:', error);
  }
})

app.post('/searchCoinData', async (req, res) => {
  try {
    const { startDate, endDate, coinName } = req.body;

    // Parse the startDate and endDate into JavaScript Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (!parsedStartDate || !parsedEndDate || !coinName) {
      return res.status(400).json({ status: 0, data: [], errors: ['Please provide valid startDate, endDate, and coinName.'] });
    }

    const query = {
      'eventTimestamp': { $gte: parsedStartDate, $lte: parsedEndDate },
      'tradingPair': coinName,
    };
    const coinData = await coinModel.find(query);
    if (coinData.length > 0) res.status(200).json({ status: 1, data: coinData, errors: [] });
  } catch (error) {
    console.error('Error searching for coin data:', error);
    res.status(500).json({ status: 0, data: [], errors: ['An error occurred while searching for coin data.'] });
  }
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../mern/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log('Server works on PORT 8080');
});
