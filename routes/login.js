

const express = require('express');
const router  = express.Router();


module.exports = function(db) {

  const getTypeOfUser = function(isManager) {
    return db.query(`
    SELECT *
    FROM users
    WHERE is_owner = $1;
    `, [isManager])
      .then(res => res.rows[0]);
  };

  const getUsersName = function(userId, user_name) {
    return db.query(`
    SELECT *
    FROM users
    WHERE id = 1$ AND name = $2;
    `, [userId, user_name])
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


  user.get('/login', (req, res) => {


    $(document).ready(function() {
      $('.form-group-admin').on('sumbit', (event) => {
        event.preventDefault();

        const managerProfile = authenticateUser(req.params.id);

        if (managerProfile) {
          res.render('/admin');
        } else {
          res.render('/menu');
        }
      });

    });

  });

};

