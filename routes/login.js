

const express = require('express');
const user  = express.Router();


module.exports = function(db) {


  user.get('/login', (req, res) => {

    res.render('login');

  });

  user.post('/login/:user_id', (req, res) => {


    req.session.userId = req.params.user_id;
    if (req.params.user === "1") {
      res.redirect('/admin');

    } else {
      res.redirect('/menu');

    }

  });

  return user;

};

