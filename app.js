const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const expressLayouts = require("express-ejs-layouts");

// database configure
const {db,session, MongoStore} = require("./config/database");

// route imports
const mainRoutes = require('./src/routes/mainRouteFfile');
const userRoutes = require('./src/routes/userRouteFile');
const aboutRoutes = require('./src/routes/aboutRouterFile');
const ourDogRoutes = require('./src/routes/ourDogsRouterFile');
const contactRoutes = require('./src/routes/contactRouterFile');
const donateRoutes = require('./src/routes/donateRouterFile');
const feedRoutes = require('./src/routes/feedRouterFile');
const volunteerRoutes = require('./src/routes/volunteerRouterFile');
const adminRoutes = require('./src/routes/adminRouterFile');

require('dotenv').config();
const app = express();


// configuring sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'baseTemplates/base');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/about-us', aboutRoutes);
app.use('/volunteer', volunteerRoutes);
app.use('/our-dogs', ourDogRoutes);
app.use('/feed', feedRoutes);
app.use('/contact', contactRoutes);
app.use('/donate', donateRoutes);
app.use('/admin', adminRoutes);


var port = process.env.PORT || 3000;
var server = app.listen(process.env.PORT||3000);
