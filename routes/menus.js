const express = require('express');
const menu  = express.Router();


module.exports = (db) => {

  const fetchAllItems = function() {
    return db.query(`
    SELECT *
    FROM menu_items;
    `)
      .then(res => res.rows);
  };

  const fetchSingleItem = function(id) {
    return db.query(`
    SELECT *
    FROM menu_items
    WHERE id= $1`, [id])
      .then(res=>res.rows[0]);
  };


  menu.get('/', (req, res) => {

    fetchAllItems()
      .then(items=>{
        const templateVars = {
          items
        };
        res.render('menu', templateVars);
      })
      .catch(err => {
        console.log(err);
        res.render("menu");
      });
  });

  menu.get('/categories/:category_id', (req, res) => {
    res.send('categories'); // to decide on categories whether redirect.
  });
  menu.get('/:menu_item_id', (req, res) => {
    fetchSingleItem()
      .then(items=>{
        const templateVars = {
          items
        };
        res.send('menu',templateVars);
      })
      .catch(err => {
        console.log(err);
        res.render("menu");
      });
  });
  return menu;
};
