const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventoryRoutes');

dotenv.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', inventoryRoutes);

//connect the database

const mongoDB = process.env.SECRET_KEY;

async function main(){
  await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
}

main().catch(err => console.log(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//listen to port 3000 by default
app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

module.exports = app;
