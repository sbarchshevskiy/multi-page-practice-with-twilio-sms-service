// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['secret']
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
console.log('db connection test', dbParams);
const db = new Pool(dbParams);
db.connect(err => console.log('connected', err));
const dbHelpers = require('./helpers/userHelpers')(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


// app.use(usersRoutes);

// const usersRoutes = require("./routes/users");
// app.use('/', usersRoutes(db));

const menuRoutes = require("./routes/menus");
app.use('/menu', menuRoutes(db));

const cartRoutes = require("./routes/cart");
app.use('/cart', cartRoutes(db));

const loginRoutes = require("./routes/login");
app.use('/login', loginRoutes(db));

const thankYouRoutes = require("./routes/thankYou");
app.use('/thankYou', thankYouRoutes(db));

const adminRoutes = require("./routes/admin")
app.use('/admin',adminRoutes(db))

app.get("/", (req, res) => {
  res.redirect('/login');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
