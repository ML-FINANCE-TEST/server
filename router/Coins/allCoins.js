const express = require("express");
const axios = require("axios");
const tf = require("@tensorflow/tfjs");

const router = express.Router();

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/coins",
  headers: {
    "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

// Define a TensorFlow.js model
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

router.get("/", async (req, res) => {
  const {
    referenceCurrencyUuid,
    timePeriod,
    tiers,
    orderBy,
    orderDirection,
    limit,
    offset,
  } = req.query;
  const params = {
    referenceCurrencyUuid,
    timePeriod,
    "tiers[0]": tiers,
    orderBy,
    orderDirection,
    limit,
    offset,
  };

  try {
    // Fetch data from Coinranking API
    const response = await axios.request({ ...options, params });
    const coinData = response.data;

    // Perform predictions using TensorFlow.js model
    const input = tf.tensor(coinData.data.coins.map(coin => coin.price));
    const predictions = model.predict(input).arraySync();

    // Append predictions to the coin data
    const augmentedCoinData = coinData.data.coins.map((coin, index) => ({
      ...coin,
      prediction: predictions[index],
    }));

    res.status(response.status).json({ ...coinData, augmentedCoinData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
