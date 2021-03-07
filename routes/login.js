const express = require('express');
const router  = express.Router();


module.exports = () => {

  router.get("/login", (req, res) => {
    console.log('inside login')

    res.render('login');
  });
  console.log('loginroute')
   return router;
};
