/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const getUsers = require('../helpers/userHelpers');



module.exports = (db) => {


module.exports = (db) => {
  router.get("/", (req, res) => {
    getUsers()
    .then(users => {
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  user.get('/login', (req, res) => {
    res.render('login');
  });

  user.get('/register', (req, res) => {
    res.render('register');
  });
  user.post('/login', (req, res) => {
    res.redirect('menu');
  });
  user.post('/register', (req, res) => {
    res.redirect('menu');
  });

  return user;
};


// module.exports = (db) => {

//   menu.get('/', (req, res) => {
//     res.render('menu'); // to decide on categories whether redirect.
//   });

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

//   cart.get('/', (req, res) => {
//     res.render('cart');
//   });

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

}


