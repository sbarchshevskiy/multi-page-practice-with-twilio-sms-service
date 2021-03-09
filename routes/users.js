/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const user  = express.Router();
const menu  = express.Router();
const cart  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // user.get('/', (req, res) => {
  //   res.render('login');
  // });

  const newUser =  function(user) {
    console.log('calling new user func');
    return db.query(`
    INSERT INTO users(phone_number, email, password, is_client)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `, [user.phone, user.email, user.password, true]).then(res => res.rows[0]);
  };

  const findUserId = function(userId) {
    return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
    `, [userId])
      .then(res => res.rows[0]);
  };

  const loadManagerProfile = function(manager) {
    return db.query(`
    SELECT *
    FROM users
    WHERE is_client = $1;
    `, [manager])
      .then(res => res.rows[0]);
  };

  const getUsersEmail = function(email) {
    return db.query(`
      SELECT *
      FROM users
      WHERE email = $1;
    `, [email])
      .then(res => res.rows[0]);
  };

  const authUserLogin = function(email, password) {
    return db.getUsersEmail(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };

  user.get('/login', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send(
        {
          message: "please login"
        }
      );
      return;
    }

    db.findUserId(userId)
      .then(user => {
        if (!user) {
          res.send(
            {
              error: "not a registered user"
            }
          );
          return;
        }
        res.send(
          {
            user:
          {
            phoneNumber: user.phone_number,
            email: user.email,
            id: userId,
            isClient: user.is_client
          }
          })
          .catch(err => res.send(err));
      });

    res.render('login');
  });

  user.post('/login', (req, res) => {
    const {
      email,
      password,
      phoneNumber,
      isClient
    } = req.body;


    authUserLogin(email, password)
      .then(user => {
        if (!user) {
          res.send({
            error: "error logging in"
          });
          return;
        }
        req.session.userId = user.id;
        res.send(
          {
            user:
            {
              phoneNumber: user.phone_number,
              email: user.email,
              // id: userId,
              isClient: user.is_client
            }
          });

        //is_client should have been is_manager
        //therefore loadManagerProfie is by default true
        // needs to be evaluated to false to give access
        // to manager
        if (!loadManagerProfile) {
          res.redirect('/menu');
        } else {
          res.redirect('/admin');
        }
      })
      .catch(err => res.send(err));

  });

  user.get('/register', (req, res) => {
    res.render('register');
  });

  user.post('/register', (req, res) => {
    console.log('test post on top of func');
    console.log('req body', req.body);

    console.log('db ',db);

    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    console.log('req body1', req.body);
    newUser(user)
      .then(user => {
        console.log('test post route');
        if (!user) {
          res.send(
            {
              error: "error registering"
            });

          return;
        }
        req.session.userId = user.id;
        // res.send('confirm');
        res.redirect('/menu');
      })
      .catch(err => {
        console.log('test catch');
        res.status(500).json(err);
      });

  });
  // user.get('/thankyou', (req, res) => {
  //   res.render('thankyou');
  // });
  return user;
};


// module.exports = (db) => {

// menu.get('/', (req, res) => {
//   res.render('menu'); // to decide on categories whether redirect.
// });

//   menu.get('/menu', (req, res) => {
//     res.render('menu');
//   });

//   menu.get('/categories/:category_id', (req, res) => {
//     res.send('categories'); // to decide on categories whether redirect.
//   });

//   menu.get('/:menu_item_id', (req, res) => {
//     res.send('menu_item_id'); // to decide on categories whether redirect.
//   });

//   return menu;
// };


// module.exports = (db) => {

// cart.get('/', (req, res) => {
//   res.render('cart');
// });

//   cart.get('/cart', (req, res) => {
//     res.render('cart');
//   });

//   cart.post('/add', (req, res) => {
//     res.send('item added'); // to decide on categories whether redirect.
//   });

//   cart.post('/edit', (req, res) => {
//     res.send('edit item'); // to decide on categories whether redirect.
//   });

//   cart.post('/reset', (req, res) => {
//     res.send('items reset'); // to decide on categories whether redirect.
//   });

//   return cart;

// };


