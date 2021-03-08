/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const getUsers = require('../helpers/userHelpers');



  user.get('/login', (req, res) => {
    console.log('login . get router');


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

  // router.get('/register', (req, res) => {
  //   console.log('register . get router');
  //   res.render('register');
  // });


  return user;
};



