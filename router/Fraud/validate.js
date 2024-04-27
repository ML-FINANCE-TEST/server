const express = require('express');
const router = express.Router();
const WAValidator = require('wallet-address-validator');

// Define route for validating wallet addresses
router.get('/:address', (req, res) => {
    const { address } = req.params;

    // Validate the address
    const valid = WAValidator.validate(address, 'bitcoin', 'prod');

    // Send response based on validation result
    if (valid) {
        res.status(200).json({ valid: true, message: 'This is a valid address' });
    } else {
        res.status(400).json({ valid: false, message: 'Address INVALID' });
    }
});

module.exports = router;
