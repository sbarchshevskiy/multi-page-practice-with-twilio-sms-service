const express =require('express');
const cart  = express.Router();

module.exports = (db) => {
  cart.get('/', (req, res) => {
    res.render('cart');
  });

  cart.post('/add', (req, res) => {
    res.render('cart'); // to decide on categories whether redirect.
  });
  cart.post('/edit', (req, res) => {
    res.send('edit item'); // to decide on categories whether redirect.
  });
  cart.post('/reset', (req, res) => {
    res.send('items reset'); // to decide on categories whether redirect.
  });

  cart.post('/submit', (req, res) => {
    res.redirect('/thankyou'); // sends to thank you & triggers SMS
  });

  return cart;
};
