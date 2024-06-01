
const mongoose = require('mongoose');
// Connect to MongoDB
// Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
});

// Create Product Model
const Product = mongoose.model('Product', productSchema);

// Middleware

// Search Products Endpoint
const search = (app)=>{

app.get('/api/products', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
};
module.exports = search;

// Start Server
