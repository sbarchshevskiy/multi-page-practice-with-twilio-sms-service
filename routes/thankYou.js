const express = require('express');
const thankYou = express.Router();

 module.exports = (db) => {

const fetchBiggestCookingTime = () => {
  // Show time of biggest cooking_time of most recent order
  return db.query(`
  SELECT MAX(cooking_time)
  FROM menu_items
  INNER JOIN order_menu_items ON menu_items.id = order_menu_items.menu_item_id
 INNER JOIN orders ON orders.id = order_menu_items.order_id
 WHERE orders.user_id = $1
 GROUP BY order_menu_items.order_id
  ORDER BY order_menu_items.order_id DESC
  ;`, [1])
  .then(res => res.rows[0].max);
};

thankYou.get('/', (req, res) => {
  fetchBiggestCookingTime()
  .then(cookingTime => {
    const templateVars = {
      cookingTime
    };
    res.render('thankyou', templateVars);
  })
  .catch(err => {
    console.log(err)
    res.render('thankyou');
  });
});



// thankYou.get('/', (req, res) => {
//   res.render('thankyou');
//   });
 return thankYou;
  };
