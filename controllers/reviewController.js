const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    const { productId, userId, rating, comment } = req.body;
    try {
        const review = new Review({ productId, userId, rating, comment });
        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve reviews by product ID
exports.getReviewsByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            review.rating = rating || review.rating;
            review.comment = comment || review.comment;
            const updatedReview = await review.save();
            res.json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            await review.remove();
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
