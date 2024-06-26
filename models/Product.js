const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        imageUrl: { type: String, required: true },
        stock: { type: Number, required: true },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt fields
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
