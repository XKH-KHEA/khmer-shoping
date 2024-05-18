const Cart = require('../models/Cart');

// Create a new cart or update existing cart
exports.addToCart = async (req, res) => {
    const { userId, items } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            // If cart exists for user, update it
            items.forEach(item => {
                const existingItemIndex = cart.items.findIndex(i => i.productId.toString() === item.productId);
                if (existingItemIndex > -1) {
                    cart.items[existingItemIndex].quantity += item.quantity;
                } else {
                    cart.items.push(item);
                }
            });
            cart = await cart.save();
            res.json(cart);
        } else {
            // If cart does not exist for user, create new cart
            const newCart = new Cart({
                userId,
                items
            });
            const createdCart = await newCart.save();
            res.status(201).json(createdCart);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a cart by user ID
exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId', 'name price');
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a cart
exports.updateCart = async (req, res) => {
    const { items } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            cart.items = items;
            const updatedCart = await cart.save();
            res.json(updatedCart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a cart by user ID
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
        if (cart) {
            res.json({ message: 'Cart removed' });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
