var express = require('express');
var router = express.Router();
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');
const { getUserById, PushOrderInPurchaseList } = require('../controllers/user');

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require('../controllers/order');
const { updateStock } = require('../controllers/product');
const { route } = require('./product');

//params getOrderbyid
router.param('userId', getUserById);
router.param('orderId', getOrderById);

//Acual Routes //Create ROute
router.post(
  '/orders/create/:userId',
  isSignedIn,
  isAuthenticated,
  PushOrderInPurchaseList,
  updateStock,
  createOrder
);

//GET  Read Route

router.get(
  '/orders/all/:user',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//Status of Order

router.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  '/order/update/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
