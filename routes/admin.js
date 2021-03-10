const express = require('express');
const admin  = express.Router();


module.exports = (db) => {

  const orderIsReady = function(status, id) {
    return db.query(
      `UPDATE orders
      SET is_ready = $1
      where id = $2;
    `, [status, id]);
  };

  const orderIsAccepted = function(status, id) {
    return db.query(
      `UPDATE orders
      SET accepted = $1
      where id = $2;
    `, [status, id]);
  };

  const fetchAllOrders = function() {
    return db.query(`
      SELECT users.name, users.phone_number, orders.id, orders.is_ready, users.accepted, order_menu_items.quantity, menu_items.name as item, (menu_items.price * order_menu_items.quantity) as total_price
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

    let globalObject;

    fetchAllOrders()
      .then(orders=>{
        const orderObject = {};
        for (const order of orders) {
          orderObject[order.id] = {
            id: order.id,
            name: order.name,
            phoneNumber : order.phone_number,
            quantity: order.quantity,
            items:[],
            totalPrice: order.total_price,
            isReady: order.is_ready,
            orderAccepted : order.accepted
          };
        } for (const order of orders) {
          orderObject[order.id].items.push(order.item);
        }

        globalObject = orderObject;
        console.log('global', globalObject);

        const templateVars = {
          orders : Object.values(orderObject)
        };
        console.log('obj.val',Object.values(orderObject));
        res.render('admin',templateVars);
      })
      .catch(err => {
        console.log(err);
        res.render('admin');
      });


    const modifyOrder = function(obj) {
      let orderStatus = '';
      for (let item in obj) {
        orderStatus = obj[item].is_ready;
      }
      console.log('order stt',orderStatus);
      return orderStatus;
    };
    console.log(modifyOrder('test global',globalObject));


  });


  admin.post('/:order_id/ready', (req, res) => {

    let orderId = req.params.order_id;
    orderIsReady(true, orderId)
      .then(order => {
        console.log(`${order}, order, ${orderId} is ready!`);
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(`error ${err}`);
        res.redirect('/admin');
      });
  });

  admin.post('/:order_id/accpeted', (req, res) => {

    let orderId = req.params.order_id;
    orderIsAccepted(true, orderId)
      .then(order => {
        console.log(`${order}, order, ${orderId} is accpeted!`);
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(`error ${err}`);
        res.redirect('/admin');
      });
  });

  admin.post('/:order_id/cancel', (req, res) => {
    let orderId = req.params.order_id;
    orderIsAccepted(false, orderId)
      .then(order => {
        console.log(`${order}, order, ${orderId} is cancelled!`);
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(`error ${err}`);
        res.redirect('/admin');
      });

  });

  return admin;
};
