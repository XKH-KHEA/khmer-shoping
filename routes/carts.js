const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCartByUserId,
    updateCart,
    deleteCart
} = require('../controllers/cartController');

// Define routes for carts
router.route('/')
    .post(addToCart);

router.route('/:userId')
    .get(getCartByUserId)
    .put(updateCart)
    .delete(deleteCart);

module.exports = router;
