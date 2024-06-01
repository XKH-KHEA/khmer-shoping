const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  search,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Define routes for products
router.route("/view").post(createProduct).get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/").get(search);

module.exports = router;
