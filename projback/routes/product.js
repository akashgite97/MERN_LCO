var express = require("express");
var router = express.Router();
const {check, validationResult} = require("express-validator");
const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategory,
} = require("../controllers/product");

//All of Params
router.param("userId", getUserById);
router.param("productId", getProductById);

//All of actual Routes

//Create Product Route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Get or Read Route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//Delete Route

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//Update Product
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Listing Route
router.get("/products", getAllProducts);

//Get all distinct categories

router.get("/products/categories", getAllUniqueCategory);

module.exports = router;
