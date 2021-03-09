const express = require('express');
const menu  = express.Router();

module.exports = (db) => {
   menu.get('/', (req, res) => {
    res.render('menu'); // to decide on categories whether redirect.
   });

   menu.get('/categories/:category_id', (req, res) => {
     res.send('categories'); // to decide on categories whether redirect.
   });
  menu.get('/:menu_item_id', (req, res) => {
     res.send('menu_item_id'); // to decide on categories whether redirect.
  });
   return menu;
 };
