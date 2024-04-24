const express = require("express");
const axios = require("axios");
const router = express.Router();

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/stats",
  headers: {
    "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

router.get("/:referenceCurrencyUuid", async (req, res) => {
  const { referenceCurrencyUuid } = req.params;
  const params = { referenceCurrencyUuid };

  try {
    const response = await axios.request({ ...options, params });
    console.log(response.data); // Log the response
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
