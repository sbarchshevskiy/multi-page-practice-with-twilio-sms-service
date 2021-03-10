user.get('/login', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send(
      {
        message: "please login"
      }
    );
    return;
  }

  db.findUserId(userId)
    .then(user => {
      if (!user) {
        res.send(
          {
            error: "not a registered user"
          }
        );
        return;
      }
      res.send(
        {
          user:
        {
          phoneNumber: user.phone_number,
          email: user.email,
          id: userId,
          isClient: user.is_client
        }
        })
        .catch(err => res.send(err));
    });

  res.render('login');
});



user.post('/login', (req, res) => {
  const {
    email,
    password,
    phoneNumber,
    isClient
  } = req.body;


  authUserLogin(email, password)
    .then(user => {
      if (!user) {
        res.send({
          error: "error logging in"
        });
        return;
      }
      req.session.userId = user.id;
      res.send(
        {
          user:
          {
            phoneNumber: user.phone_number,
            email: user.email,
            // id: userId,
            isClient: user.is_client
          }
        });

      //is_client should have been is_manager
      //therefore loadManagerProfie is by default true
      // needs to be evaluated to false to give access
      // to manager
      if (!loadManagerProfile) {
        res.redirect('/menu');
      } else {
        res.redirect('/admin');
      }
    })
    .catch(err => res.send(err));

});


user.post('/register', (req, res) => {
  console.log('test post on top of func');
  console.log('req body', req.body);

  console.log('db ',db);

  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  console.log('req body1', req.body);
  newUser(user)
    .then(user => {
      console.log('test post route');
      if (!user) {
        res.send(
          {
            error: "error registering"
          });

        return;
      }
      req.session.userId = user.id;
      // res.send('confirm');
      res.redirect('/menu');
    })
    .catch(err => {
      console.log('test catch');
      res.status(500).json(err);
    });

});
