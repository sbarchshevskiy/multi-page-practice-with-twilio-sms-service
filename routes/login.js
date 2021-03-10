

const express = require('express');
const router  = express.Router();


module.exports = function(router, db) {

  const getTypeOfUser = function(manager) {
    return db.query(`
    SELECT *
    FROM users
    WHERE is_owner = $1;
    `, [manager])
      .then(res => res.rows[0]);
  };

  const authenticateUser = function(userId) {
    return db.getTypeOfUser(userType)
      .then(user => {
        if (userId) {
          return user;
        }
        return null;
      });
  };

  router.get('/login', (req, res) => {

    // const {userId, isManager} = req.body;

    if (authenticateUser) {
      res.render('/admin');
    } else {
      res.render('/menu');
    }
  });


};

