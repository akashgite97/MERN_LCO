const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      });
    }
    req.profile = user;
    next();
  });
};

/*exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No Users Not Found",
      });
    }
    res.json(users);
  });
};*/

//Get User by Id

exports.getUser = (req, res) => {
  //TODO: get back here for password

  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

//Update User
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body }, //for update all data
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authrized to update information',
        });
      }
      user.salt = undefined;
      user.erncry_password = undefined;
      res.json(user);
    }
  );
};

// userPurchaseList  find user orders

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No order in this account',
        });
      }

      return res.json(order);
    });
};

//Push Order into purchase list #Custome Middleware

exports.PushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      ammount: req.body.order.ammount,
      transaction_id: req.body.transaction_id,
    });
  });

  //Store this in DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({ error: 'Unable to save purchase list' });
      }
      next();
    }
  );
};
