const express = require('express');
const admin  = express.Router();


require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client =  require('twilio')(accountSid, authToken);




module.exports = (db) => {

  const getPhoneNumber = function(id) {
    return db.query(`
      SELECT phone_number, id
      FROM users
      WHERE id = $1;
    `, [id])
      .then(res => res.rows[0].phone_number);

  };


  const orderConfirmed = function(status, id) {
    return db.query(
      `UPDATE orders
      SET is_accepted = $1
      where id = $2
      RETURNING *;
    `, [status, id])
      .then(res => res.rows[0]);
  };

  const orderDeclined = function(status, id) {
    return db.query(
      `UPDATE orders

      SET is_accepted = $1
      where id = $2
      RETURNING *;
    `, [status, id])
      .then(res => res.rows[0]);
  };

  // const orderReady = function(status, id) {
  //   return db.query(
  //     `UPDATE orders
  //     SET is_ready = $1
  //     where id = $2;
  //   `, [status, id]);
  // };


  const sendSms = function(clientsNumber, message) {
    client.messages.create({
      // dummie phone number: +19292948737
      // the number of free texts is limited, use the feature wisely
      body: message,
      from: '+19292948737',
      to: `+1${clientsNumber}`
    })
      .then(message => console.log(message))
      .catch((err) => console.log(err));

  };


  const fetchAllOrders = function() {
    return db.query(`
      SELECT users.name, users.phone_number, orders.id, order_menu_items.quantity, menu_items.name as item, (menu_items.price * order_menu_items.quantity) as total_price, orders.is_ready, orders.is_accepted
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
      .then(orders => {
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
            orderAccepted : order.is_accepted
          };
        } for (const order of orders) {
          orderObject[order.id].items.push(order.item);
        }
        console.log('ord obj ',orderObject);


        const templateVars = {
          orders : Object.values(orderObject)
        };

        console.log('template vars: ', templateVars);
        res.render('admin',templateVars);
      })
      .catch(err => {
        console.log(err);
        res.render('admin');
      });

  });


  admin.post('/:order_id/accept', (req, res) => {


    let orderId = req.params.order_id;
    orderConfirmed(true, orderId)
      .then(order => {
        getPhoneNumber(order.user_id)
          .then(phoneNumber => {
            sendSms(phoneNumber, 'confirmed');
          })
          .catch(error => console.log(error));
        console.log(`${order}, order, ${orderId} has been confirmed!`);
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(`error ${err}`);
        res.redirect('/admin');
      });
  });

  admin.post('/:order_id/cancel', (req, res) => {


    console.log('check route');
    let orderId = req.params.order_id;
    orderDeclined(false, orderId)
      .then(order => {
        getPhoneNumber(order.user_id)
          .then(phoneNumber => {
            sendSms(phoneNumber, 'cancelled');
          })
          .catch(error => console.log(error));
        console.log(`${order}, order, ${orderId} has been declined!`);
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(`error ${err}`);
        res.redirect('/admin');
      });
  });

  // admin.post('/:order_id/ready', (req, res) => {
  //   let orderId = req.params.order_id;
  //   orderIsAccepted(false, orderId)
  //     .then(order => {
  //       console.log(`${order}, order, ${orderId} is ready!`);
  //       res.redirect('/admin');
  //     })
  //     .catch(err => {
  //       console.log(`error ${err}`);
  //       res.redirect('/admin');
  //     });
  // });

  return admin;
};
