require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const app = express();

//DB config
require('./configs/db.config');

//Middleware config
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);

// Session config + Passport
require('./configs/session.config')(app);
require('./configs/passport.config')(app);




//Routes
const index = require('./routes/index');
app.use('/', index);

const productsRouter = require('./routes/products.routes');
const authRouter = require('./routes/auth.routes');
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);


app.use((req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found"});
})


module.exports = app;
