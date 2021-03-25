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

  const renderMenuOption = function(id) {
    return db.query(
      `SELECT *
      FROM menu_items
      WHERE menu_id = $1
      `, [id])
      .then(res => res.rows);
  };

  menu.get('/', (req, res) => {
    fetchAllItems()
      .then(items => {
        const templateVars = {
          items,
          userInfo :req.userInfo
        };
        res.render('menu', templateVars);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  menu.get('/:menu_id', (req, res) => {
    console.log('menu item id');
    renderMenuOption(req.params.menu_id)
      .then(items => {
        const templateVars = {
          items,
          userInfo :req.userInfo
        };
        res.render('menu', templateVars);
      })
      .catch(error => {
        console.log('error', error);
        res.status(500).json(error);
      });
  });


  menu.get('/:menu_item_id', (req, res) => {
    fetchSingleItem()
      .then(items => {
        const templateVars = {
          items,
          userInfo :req.userInfo
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
