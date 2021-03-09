const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.get("/login", (req, res) => {

    res.render('login');
  });
  console.log('loginroute');
  return router;
};
