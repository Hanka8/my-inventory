var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var inventoryRoutes = require('./routes/inventoryRoutes');

var app = express();

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

const mongoDB = "mongodb+srv://hankamaruskevicova:myInventory123@cluster0.j93jqer.mongodb.net/my-inventory?retryWrites=true&w=majority";

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
  console.log('Server is running on port 3000');
});

module.exports = app;