const express = require("express");
const axios = require("axios");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const router = express.Router();

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/coins",
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    "tiers[0]": "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "50",
    offset: "0",
  },
  headers: {
    "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function preprocessData(data) {
  // Implement preprocessing if needed
  return data;
}

// Define TensorFlow.js model
function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.add(tf.layers.dense({ units: 64, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
  return model;
}


async function trainModel(model, xTrain, yTrain) {
  const xs = tf.tensor2d(xTrain, [xTrain.length, 1]);
  const ys = tf.tensor2d(yTrain, [yTrain.length, 1]);
  await model.fit(xs, ys, { epochs: 100 });
}


router.get("/", async (req, res) => {
  try {
    // Fetch data
    const data = await fetchData();
    if (!data) {
      res.status(500).json({ error: "Error fetching data" });
      return;
    }

    // Preprocess data (if needed)
    const processedData = preprocessData(data);

    // Extract features and labels
    const features = processedData.map((entry) => entry.feature); // Modify this based on your data structure
    const labels = processedData.map((entry) => entry.label); // Modify this based on your data structure

    // Create and train model
    const model = createModel();
    await trainModel(model, features, labels);

    // Make predictions (example)
    const prediction = model.predict(tf.tensor2d([[1]])); // Example prediction, modify as needed

    res.json({ prediction: prediction.arraySync() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
