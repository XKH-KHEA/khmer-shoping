const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
    const { orderId, amount, status, transactionId } = req.body;
    try {
        const payment = new Payment({
            orderId,
            amount,
            status,
            transactionId,
        });
        const createdPayment = await payment.save();
        res.status(201).json(createdPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all payments
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a specific payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (payment) {
            res.json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a payment
exports.updatePayment = async (req, res) => {
    const { orderId, amount, status, transactionId } = req.body;
    try {
        const payment = await Payment.findById(req.params.id);
        if (payment) {
            payment.orderId = orderId || payment.orderId;
            payment.amount = amount || payment.amount;
            payment.status = status || payment.status;
            payment.transactionId = transactionId || payment.transactionId;
            const updatedPayment = await payment.save();
            res.json(updatedPayment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (payment) {
            await payment.remove();
            res.json({ message: 'Payment removed' });
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
