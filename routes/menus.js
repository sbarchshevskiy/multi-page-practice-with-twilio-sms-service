const express = require('express');
const menu  = express.Router();


module.exports = (db) => {

  const fetchAllItems = function() {
    return db.query(`
    SELECT *
    FROM menu_items;
    `)
      .then(res => res.rows[0]);
  };

  const fetchSingleItem = function(id) {
    return db.query(`
    SELECT item_name
    FROM menu_items
    WHERE id= $1`, [id])
    .then(res=>res.rows[0])
  };


   menu.get('/', (req, res) => {
     const templateVars= {
      menu : fetchAllItems()

     }
    res.render('menu',templateVars); // to decide on categories whether redirect.
   });

   menu.get('/categories/:category_id', (req, res) => {
     res.send('categories'); // to decide on categories whether redirect.
   });
  menu.get('/:menu_item_id', (req, res) => {
     res.send('menu_item_id'); // to decide on categories whether redirect.
  });
   return menu;
 };
