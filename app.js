const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session")
const path = require('path');
const mainRoutes = require('./src/routes/mainRouteFfile');
const userRoutes = require('./src/routes/userRouteFile');
const aboutRoutes = require('./src/routes/aboutRouterFile');
const crypto = require('crypto');
const Session = require("./src/models/session");
const expressLayouts = require("express-ejs-layouts");

const secret = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secret);

const app = express();

// MongoDB connection setup
const db = require('./config/database');

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  store:new (require('express-session').MemoryStore)(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
}));

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'baseTemplates/base');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cache.middleware());

// Routes
app.use('/', mainRoutes)
app.use('/user', userRoutes)
app.use('/about-us', aboutRoutes)
// app.use('/', userRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
