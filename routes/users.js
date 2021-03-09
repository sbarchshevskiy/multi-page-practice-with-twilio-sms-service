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
    res.render('login');

    user.post('/login', (req, res) => {
      const {
        email,
        password
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
          res.send({user: {
            name: user.name,
            email: user.email,
            id: user.id

          }});
          res.redirect('menu');

        })
        .catch(err => res.send(err));

    });
  });

  user.get('/register', (req, res) => {
    res.render('register');
  });

  user.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    db.addUser(user)
      .then(user => {
        if (!user) {
          res.send(
            {
              error: "error registering"
            });
          return;
        }
        req.session.userId = user.id;
        res.send('confirm');
      })
      .catch(err => res.send(err));

  });

  user.get('/admin', (req, res) => {
    res.render('admin');
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


