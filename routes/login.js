

const express = require('express');
const user  = express.Router();


module.exports = function(db) {


  user.get('/:user_id', (req, res) => {


    req.session.userId = req.params.user_id;
    if (req.params.user_id === "1") {
      res.redirect('/admin');

    } else {
      res.redirect('/menu');

    }

  });


  user.get('/', (req, res) => {

    res.render('login');

  });

  return user;

};

