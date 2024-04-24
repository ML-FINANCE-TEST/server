const express = require("express");
const axios = require("axios");

const router = express.Router();

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/coins",
  headers: {
    "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

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
      const response = await axios.request({ ...options, params });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
