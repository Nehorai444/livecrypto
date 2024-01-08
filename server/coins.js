const db = require('mongoose');
const URL = 'mongodb://localhost:27017';

const {logger} = require("./logging")

db.connect(URL).then(() => {
  logger.info('DB is on')
});

const staticCoinScheme = db.Schema({
  tradingPair: String,
  coinId: Number
})

const staticCoinModel = new db.model("staticCoinTable", staticCoinScheme);

const coinScheme = db.Schema({
  eventType: String,
  coinId: Number,
  eventTimestamp: Date,
  tradingPair: String,
  priceChange: Number,
  priceChangePercentage: Number,
  weightedAveragePrice: Number,
  previousClosePrice: Number,
  currentPrice: Number,
  lastTradeQuantity: Number,
  bestBidPrice: Number,
  bestBidQuantity: Number,
  bestAskPrice: Number,
  bestAskQuantity: Number,
  openingPrice: Number,
  highestPrice24h: Number,
  lowestPrice24h: Number,
  totalTradedVolume: Number,
  totalTradedQuoteVolume: Number,
  firstTradeTimestamp: Number,
  lastTradeTimestamp: Number,
  firstTradeID: Number,
  lastTradeID: Number,
  totalNumberOfTrades24h: Number,
});


const coinModel = new db.model("coins", coinScheme);


module.exports = { coinModel, staticCoinModel }