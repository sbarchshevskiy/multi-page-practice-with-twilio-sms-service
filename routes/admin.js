const express = require('express');
const admin  = express.Router();


module.exports = (db) => {

  const fetchAllOrders = function() {
    return db.query(`
      SELECT users.name,users.phone_number, orders.id, order_menu_items.quantity,menu_items.name as item, (menu_items.price * order_menu_items.quantity) as total_price
      FROM users
      JOIN orders ON users.id = user_id
      JOIN order_menu_items ON orders.id = order_id
      JOIN menu_items ON menu_items.id = menu_item_id
      GROUP BY users.name,users.phone_number,orders.id ,order_menu_items.quantity, menu_items.name ,total_price
      ORDER BY orders.id;
    `)
      .then(res => res.rows);
  };

   admin.get('/', (req, res) => {

    fetchAllOrders()
    .then(orders=>{
      const orderObject = {};
      for (const order of orders) {
        orderObject[order.id] = {
          id: order.id,
          name: order.name,
          phone_number : order.phone_number,
          quantity: order.quantity,
          items:[],
          total_price: order.total_price
        }
      } for (const order of orders){
        orderObject[order.id].items.push(order.item)
      }


      const templateVars = {
        orders : Object.values(orderObject)
      }
      console.log(orders)
      res.render('admin',templateVars);
    })
    .catch(err => {
      console.log(err)
      res.render('admin')
    })
   });


   admin.post('/:order_id/accept', (req, res) => {
     res.redirect('/admin');

  });

  admin.post('/:order_id/cancel', (req, res) => {
    res.redirect('/admin');


  });

   return admin;
 };
