const express = require('express');
const admin  = express.Router();


require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client =  require('twilio')(accountSid, authToken);




module.exports = (db) => {

  const orderConfirmed = function(status, id) {
    return db.query(
      `UPDATE orders
      SET is_accepted = $1
      where id = $2;
    `, [status, id]);
  };

  // const orderDeclined = function(status, id) {
  //   return db.query(
  //     `UPDATE orders
  //     SET is_accepted = $1
  //     where id = $2;
  //   `, [status, id]);
  // };

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
      to: clientsNumber
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
    // global DB object
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
            orderAccepted : order.is_accepted
          };
        } for (const order of orders) {
          orderObject[order.id].items.push(order.item);
        }

        globalObject = orderObject;
        console.log('global', globalObject);
        console.log('ring rring ', req.params.phone_number);


        const templateVars = {
          orders : Object.values(orderObject)
        };
        console.log('obj.val',Object.values(orderObject).phoneNumber);
        res.render('admin',templateVars);
      })
      .catch(err => {
        console.log(err);
        res.render('admin');
      });


    const getPhone = function(obj, id) {
      let phoneNumber = '';
      for (let item in obj) {
        phoneNumber = obj[item].phone_number[id];
      }
      console.log('order stt',phoneNumber);
      return phoneNumber;
    };
    console.log(getPhone('test global db obj', globalObject));

  });




  admin.post('/:order_id/accept', (req, res) => {

    let clientPhoneNumber = req.params.phoneNumber;
    let orderId = req.params.order_id;
    console.log('ring rring ', clientPhoneNumber);
    orderConfirmed(true, orderId)
      .then(order => {
        console.log(`${order}, order, ${orderId} has been confirmed!`);
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(`error ${err}`);
        res.redirect('/admin');
      });
  });

  // admin.post('/:order_id/cancel', (req, res) => {

  //   let orderId = req.params.order_id;
  //   orderDeclined(false, orderId)
  //     .then(order => {
  //       console.log(`${order}, order, ${orderId} has been declined!`);
  //       res.redirect('/admin');
  //     })
  //     .catch(err => {
  //       console.log(`error ${err}`);
  //       res.redirect('/admin');
  //     });
  // });

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
