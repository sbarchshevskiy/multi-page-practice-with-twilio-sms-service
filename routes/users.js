/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get("/", (req, res) => {

    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/login', (req, res) => {
    console.log('login . get router');
<<<<<<< HEAD
    res.render('login');
  });

  router.get('/register', (req, res) => {
    console.log('register . get router');
    res.render('login');
  });


  return router;
};


=======
    res.end();
  });

  return router;
};
>>>>>>> routes
