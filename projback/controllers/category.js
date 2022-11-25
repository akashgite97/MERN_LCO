const Category = require('../models/category');

//Get category id from url
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: 'category not found in DB' });
    }
    req.category = category;
    next();
  });
};

//Create Category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Not able to save category in databse',
      });
    }
    res.json({ category });
  });
};

//Get Gategory
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'No Category Found',
      });
    }
    res.json(categories);
  });
};

//Update Category

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: 'Falied to update category',
      });
    }
    res.json(updatedCategory);
  });
};

//Delete category
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Faied to delete category',
      });
    }
    res.json({ message: `${category} Successfully Deleted` });
  });
};
