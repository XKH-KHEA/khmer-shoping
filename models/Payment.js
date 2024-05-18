const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        transactionId: { type: String },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt fields
    }
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
