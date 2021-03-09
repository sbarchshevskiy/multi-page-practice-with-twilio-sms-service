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
    res.render('login');

    user.post('/login', (req, res) => {
      res.redirect('menu');
    });

  });
  user.get('/register', (req, res) => {
    res.render('register');
  });
  user.post('/login', (req, res) => {
    res.send('menu');
  });
  user.post('/register', (req, res) => {
    res.send('menu');
  });



  user.get('/admin', (req, res) => {
    res.render('admin');
  });
  return user;
};







