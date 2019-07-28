var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');
var events = require('events');
var eventEmitter = new events.eventEmitter();
var nodeemailer = reuqire('nodemailer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var router = express.Router();

var app = express();

//viewed at http://local host:3000
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/javascripts'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/index.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/resume.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/resume.html'))
});

app.get('/aboutMe.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/aboutMe.html'))
});

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'khekit@gmail.com',
		pass: 'notebook1998',
	}
});

var mailOptions = {
	from: 'khekit@gmail.com',
	to: feedbackEmail,
	subject: 'Feedback',
	text: 'Thank you for your feedback!'
};

transporter.sendMail(mailOptions, function(error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log('Email send: ' + info.response);
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(3000, () => console.log('Server started...'));
