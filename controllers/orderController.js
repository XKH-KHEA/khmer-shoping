const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    const { userId, products, totalPrice, status, shippingAddress } = req.body;
    try {
        const order = new Order({
            userId,
            products,
            totalPrice,
            status,
            shippingAddress,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a specific order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    const { products, totalPrice, status, shippingAddress } = req.body;
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.products = products || order.products;
            order.totalPrice = totalPrice || order.totalPrice;
            order.status = status || order.status;
            order.shippingAddress = shippingAddress || order.shippingAddress;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.remove();
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
