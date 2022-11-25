const order = require('../models/order');
const { Order, ProductCart } = require('../models/order');

//Get order By Id
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price') //
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: 'No order found' });
      }
      req.order = order; //Store order  in req.order
      next();
    });
};

//Create Order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res
        .status(400)
        .json({ error: 'Failed to save your order in Database' });
    }
    req.json(order);
  });
};

//Get All orders
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: 'No orders found in DB' });
      }
      res.json(order);
    });
};

// Get Order Status
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

// Update Order Status
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: 'Cannot Update order status ' });
      }
      res.json(order);
    }
  );
};
