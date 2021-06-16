const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');

router.get('/', (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json(err));
});

router.post('/results', (req, res, next) => {
  const { name, price, category } = req.body;
  const filterObject = {};

  if (name) {
    filterObject.name = name;
  }

  if (price !== '---') {
    const lowerPrice = parseInt(price.split('-')[0]);
    const higherPrice = parseInt(price.split('-')[1]);
    filterObject.price = { $gte: lowerCap, $lte: higherCap };
  }

  if (category !== '---') {
    filterObject.category = category;
  }

  Product.find(filterObject)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/product/:id', (req, res, next) => {
  const { id } = req.params;
  Product.findOne({ _id: id })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
});

router.post('/product/:id', (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      User.findOneAndUpdate(
        { id: req.user.id },
        { $push: { currentCart: { quantity, productId: product } } },
        { new: true }
      )
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
});

router.get('/cart', (req, res, next) =>{
    let subtotal = 0;
    let products = 0;

    const user = User.findById({ id: req.user.id })
    .populate('currentCart.productId')
    console.log(product, products)

    if (user.currentCart.length !== 0){
        user.currentCart.forEach((product) => {
            product.productSubtotal = Math.round(
              product.quantity * product.productId
            )
        })
    }
})

module.exports = router;
