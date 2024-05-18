const express = require('express');
const router = express.Router();
const {
    createReview,
    getReviews,
    getReviewsByProductId,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Define routes for reviews
router.route('/')
    .post(createReview)
    .get(getReviews);

router.route('/:productId')
    .get(getReviewsByProductId);

router.route('/:id')
    .put(updateReview)
    .delete(deleteReview);

module.exports = router;
