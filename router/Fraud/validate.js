const express = require('express');
const router = express.Router();
const WAValidator = require('wallet-address-validator');

// Define route for validating wallet addresses
router.get('/:coin/:address', (req, res) => {
    const { coin, address } = req.params;

    // Validate the address for the specified coin
    const valid = WAValidator.validate(address, coin, 'prod');

    // Send response based on validation result
    if (valid) {
        res.status(200).json({ valid: true, message: `This is a valid ${coin} address` });
    } else {
        res.status(400).json({ valid: false, message: `Invalid ${coin} address` });
    }
});

module.exports = router;
