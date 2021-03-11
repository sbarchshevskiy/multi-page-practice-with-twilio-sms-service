const express = require('express');
const cart  = express.Router();

module.exports = (db) => {

  const submitOrder = function(isCompleted, orderId) {
    return db.query(
      `UPDATE orders
      SET is_completed = $1
      WHERE id = $2
      RETURNING *;
      `, [isCompleted, orderId])
      .then(res => res.rows[0]);
  };

  const fetchCart = function() {
    return db.query(`
      SELECT id
      FROM orders
      ORDER BY id DESC
    `)
      .then(res => {
        console.log(res.rows);
        return res.rows[0].id;
      })

      .then(id => {
        return db.query(`
      SELECT orders.id as order_id, menu_items.name as item, menu_items.thumbnail, order_menu_items.quantity as quantity,menu_items.price as price_per_item, (menu_items.price * order_menu_items.quantity) as total_price, orders.is_completed
      FROM users
      JOIN orders ON users.id = user_id
      JOIN order_menu_items ON orders.id = order_id
      JOIN menu_items ON menu_items.id = menu_item_id
      WHERE orders.id = $1
      GROUP BY orders.id ,item, menu_items.thumbnail,quantity,price_per_item,total_price;

      `, [id]);
      })
      .then(res => {
        console.log(res.rows);
        return res.rows;
      });
  };

  cart.get('/', (req, res) => {
    fetchCart()
      .then(cart => {
        let total = 0;
        for (const item of cart) {
          total += item.total_price;
        }
        const templateVars = {
          cart,
          total
        };
        console.log('cart: ',cart);
        res.render('cart', templateVars);
      })
      .catch(err =>{
        console.log(err);
        res.render('cart');
      });
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



  cart.post('/:order_id/submit', (req, res) => {

    console.log('on submit');

    const orderId = req.params.order_id;
    console.log('order id cookie ', orderId);
    submitOrder(true, orderId)
      .then(order => {
        console.log(`${order} order id, ${orderId} is completed on clients side`);
        res.redirect('/thankYou');
      })
      .catch(error => console.log('error', error));

  });

  return cart;
};
