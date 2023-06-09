var createError = require('http-errors');
var express = require('express');
var fileUpload=require("express-fileupload");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var con=require("./configure/db_connection")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  fileUpload()
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter.index);
app.use('/crop', usersRouter.crop);
app.use('/about', usersRouter.about);
app.use('/registration', usersRouter.registration);
app.use('/seed', usersRouter.seed);
app.use('/tool', usersRouter.tool);
app.use('/fertilicer', usersRouter.fertilicer);
app.use('/pesticide', usersRouter.pesticide);
app.use('/notification', usersRouter.notification);
// app.use("/tool", (req, res) => {
//   if (!req.files) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   const file = req.files.myFile;
// });


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

module.exports = app;