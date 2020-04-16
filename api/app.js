var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyparser = require("body-parser")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//require('./config/passport');
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

mongoose.connect('mongodb+srv://student:Teacher@cluster0-vtfur.mongodb.net/tickets?retryWrites=true&w=majority', { useNewUrlParser: true}, (err) => {

    if(!err) { console.log('MongoDB connection succeeded.')}

    else { console.log(`Error in DB connection: ${err}`)}

});
module.exports = app;
