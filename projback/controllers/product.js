const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { sortBy } = require('lodash');

//Custom Middleware for getProductByID
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Product Not Found',
        });
      }
      req.product = product;
      next();
    });
};

//Create Product

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; //Store all type extension files

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: 'Problem with image' });
    }

    //Destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ error: 'Please include all fields' });
    }

    let product = new Product(fields);

    //Handle File Here #Manage Photos
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: 'File size to big' });
      }
      product.photo.data = fs.readFileSync(file.photo.path); //Get file path
      product.photo.contentType = file.photo.type; //
    }
    console.log(product);

    //Save in DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Savind T-shirt in DB Failed' });
      }
      res.json(product);
    });
  });
};

//Get Single Product
exports.getProduct = (req, res) => {
  req.product.photo = undefined; //Not Get Photo from DB
  return res.json(req.product);
};

//Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//Delete Product
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: 'Not able to delete product' });
    }
    res.json({ message: `Deletion was sucessfully`, deletedProduct });
  });
};

//Update Product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: 'Problem with image' });
    }

    let product = req.product;

    //Updataion Code
    product = _.extend(product, fields); //Take existing databas value

    //Handle File Here #Manage Photos
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: 'File size to big' });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //Save in DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Updation of T-shirt failed' });
      }
      res.json(product);
    });
  });
};

//Get All Products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sort ? req.query.sortBy : '_id';

  Product.find()
    .select('-photo') //Dont select photo
    .populate('category')
    .sort([[sortBy, 'asc']]) //Product Sort
    .limit(limit) //Display limited 8 products
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: 'No product found' });
      }

      res.json(products);
    });
};

//Get all distinct categories
exports.getAllUniqueCategory = (req, res) => {
  Product.distinct('category', {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: 'No category found' });
    }
    res.json(category);
  });
};

//UpdateStock increase sold and decrease stock
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.product.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id }, //Find Product by id
        update: { $inc: { stock: -prod.count, sold: +prod.count } }, //Perform update operation
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({ error: 'Bulk operation failed' });
    }
    next();
  });
};
