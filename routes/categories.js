const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// Define routes for categories
router.route('/')
    .post(createCategory)
    .get(getCategories);

router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;
