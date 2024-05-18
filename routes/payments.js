const express = require('express');
const router = express.Router();
const {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController');

// Define routes for payments
router.route('/')
    .post(createPayment)
    .get(getPayments);

router.route('/:id')
    .get(getPaymentById)
    .put(updatePayment)
    .delete(deletePayment);

module.exports = router;
