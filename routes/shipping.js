const express = require('express');
const router = express.Router();
const { calculateShippingCost, trackShipment } = require('../controllers/shippingController');

// Calculate shipping cost
router.post('/calculate', calculateShippingCost);

// Track shipment
router.get('/track/:trackingNumber', trackShipment);

module.exports = router;
