/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const user  = express.Router();
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
    res.render('login');
  });

  user.post('/login', (req, res) => {
    res.redirect('/');
  });



  user.get('/register', (req, res) => {
    res.render('register');
  });



  return user;
};







