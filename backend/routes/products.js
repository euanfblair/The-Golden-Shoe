const router = require('express').Router();
let Product = require('../models/product.model');

// GET request to retrieve all products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to add a new product
router.route('/add').post((req, res) => {
  // Extracting product details from request body
  const name = req.body.name;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const color = req.body.color;
  const size = req.body.size;
  const price = Number(req.body.price);
  const image = req.body.image;
  const description = req.body.description;
  const countInStock = Number(req.body.countInStock);

  const newProduct = new Product({
    name,
    category,
    subcategory,
    color,
    size,
    price,
    image,
    description,
    countInStock,
  });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to add multiple new products
router.route('/add/bulk').post((req, res) => {
  const products = req.body; // Array of product objects
  Product.insertMany(products)
    .then(() => res.json('Products added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to retrieve a product by ID
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});

// PUT request to decrease a product's stock
router.route('/decrease/:id').put((req, res) => {
  const { size } = req.body;

  Product.findById(req.params.id)
    .then(product => {
      const sizeObj = product.sizes.find(s => s.size === size);

      if (sizeObj) {
        sizeObj.stock--;

        product.save()
          .then(() => res.json('Product stock decreased!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        res.status(400).json('Error: size not found');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; // Export the router
