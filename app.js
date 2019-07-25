var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');

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

/*router.get('/', (req, res) => {
	res.render('index', {
		title: 'Homepage'
	});
});

router.get('/', (req, res) => {
	res.render('resume', {
		title: 'Resume'
	});
});

router.get('/', (req, res) => {
	res.render('aboutMe', {
		title: 'About'
	});
});*/

//module.exports = router;

/*var pathname = url.parse(req.url).pathname;
pathname = ( pathname === '/' || pathname === '') ? '/index.html' : pathname;

fs.readFile(__dirname + pathname, function(err, data) {
	if (err) {
		console.log(err);
	}
	else
	{


	}
});*/

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

app.listen(3000);
