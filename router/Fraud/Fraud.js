const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:wallet', async (req, res) => {
  const walletAddress = req.params.wallet;

  const options = {
    method: 'GET',
    url: `https://crypto-fraud-detection2.p.rapidapi.com/ETH/fraud/${walletAddress}`,
    headers: {
      'X-RapidAPI-Key': 'c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be',
      'X-RapidAPI-Host': 'crypto-fraud-detection2.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
