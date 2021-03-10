const express = require('express');
const admin  = express.Router();


module.exports = (db) => {

  const fetchAllOrders = function() {
    return db.query(`
    SELECT *
    FROM orders;
    `)
      .then(res => res.rows);
  };

   admin.get('/', (req, res) => {

    fetchAllOrders()
    .then(orders=>{
      const templateVars = {
        orders
      }
      res.render('admin',templateVars);
    })
    .catch(err => {
      console.log(err)
      res.render('admin')
    })
   });

   return admin;
 };
