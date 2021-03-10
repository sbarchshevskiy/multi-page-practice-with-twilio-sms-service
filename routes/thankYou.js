const express = require('express');
const thankYou = express.Router();

 module.exports = (db) => {

 thankYou.get('/', (req, res) => {
  res.render('thankyou');
  });
 return thankYou;
 };
