const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/fear-and-greed-index', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://fear-and-greed-index.p.rapidapi.com/v1/fgi',
      headers: {
        'X-RapidAPI-Key': 'c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be',
        'X-RapidAPI-Host': 'fear-and-greed-index.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the Fear and Greed Index' });
  }
});

module.exports = router;
