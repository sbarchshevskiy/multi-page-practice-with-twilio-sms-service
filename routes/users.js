/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const user  = express.Router();


module.exports = (db) => {

  user.get('/login', (req, res) => {
    console.log('login . get router');

    res.render('login');
  });

  // router.get('/register', (req, res) => {
  //   console.log('register . get router');
  //   res.render('register');
  // });


  return user;
};



