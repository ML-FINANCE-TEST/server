const express = require("express");
const axios = require("axios");

const router = express.Router();

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/ohlc",
  headers: {
    "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

router.get("/:referenceCurrencyUuid", async (req, res) => {
  const { referenceCurrencyUuid } = req.params;
  const { interval } = req.query;
  const params = { referenceCurrencyUuid, interval };

  try {
    const response = await axios.request({ ...options, params });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { interval } = req.query;
  const referenceCurrencyUuid = "yhjMzLPhuIDl";
  const params = { referenceCurrencyUuid, interval, uuid };
  console.log(uuid, "uuid");
  try {

    const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/ohlc",
        headers: {
          "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
        params: {
            uuid: uuid,
            referenceCurrencyUuid: 'yhjMzLPhuIDl', // Optional: Default is US Dollar
            interval: 'day' // Optional: Default is 'day'
        },
      };

    const response = await axios.request({ ...options, params });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
