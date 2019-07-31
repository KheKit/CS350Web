const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const url = require('url');
const nodemailer = require('nodemailer"')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const router = express.Router();

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

function alertMessage() {
	alert("Thank you…. a confirmation email message will be sent to you soon.");

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'khekit@gmail.com',
			pass: 'notebook1998',
		}
	});

	var mailOptions = {
		from: 'khekit@gmail.com',
		to: 'khekit98@yahoo.com',
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

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/index.html'))
	});
}

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

// This is the only POST route that needed in this project
app.post('/views/Feedback/index.htm', function (req, res) {
  var body = '';
  var testValidity = false; // never trust the client side
  // receiving data
  req.on('data', function(chunk) {
    body += chunk.toString();
  });
  // Now received all data gathered in body
  req.on('end', function() {
    testValidity = ffv.validateForm(body);
    if (testValidity === true) {
      // The form is fully valid
      var ts = Date.now(); // Using a timestamp as a reference number
      var parsed = qs.parse(body);
      fs.appendFile('flatfileDB.txt', convertToString(parsed, ts), function(error){
        if (error) {
          console.log('Error writing to flatfileDB.txt file: ', error);
          throw error;
        }
        console.log('Wrote to flatfileDB.txt file successfully!');
      });
      sendEmail(parsed['email'],ts);
      res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'} );
      res.end();
    }
    else {
      // There are errors that need to be sent back to the client
      // res.writeHead(422, {'Content-Type': 'text/plain'} ); // TODO change this back
      res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'} );
      res.end(testValidity);
    }
  });
});

// This handles all GET requests
app.get('*', function (req, res) {
  /* 
    This block merely skips over the call for the 
    favicon, as I'm not dealing with it yet.
  */
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    return res.end();
  }
  /* 
    `url.parse(urlString)` returns a URL object
    `url.pathname` Gets and sets the path portion of the URL.
  */
  var pathname = url.parse(req.url).pathname;
  // Sets up a default route to go directly to the "front page"
  pathname = ( pathname === '/' || pathname === '' ) ? '/index.htm' : pathname;

  /*
    `path.extname()` returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path (see path.basename()) , an empty string is returned.
  */
  var ext = path.extname(pathname);
  /*
    "fs.readFile(path, callback)" asynchronously reads the entire contents of a file.
  */
  fs.readFile(__dirname + pathname, function(err, data){
    // Handle any type of error first
	// __dirname gives you the path of the currently running file
    if (err) {
      if(ext){
        res.writeHead(404, {'Content-Type': mimeTypes[ext]});
      }
      else{
        res.writeHead(404, {'Content-Type': 'text/html'});
      }
      return res.end("404 Not Found");
    }  
    // If `ext` is not an empty string, deal with the MIME type
    if(ext){
      res.writeHead(200, {'Content-Type': mimeTypes[ext]});
    }
    else{
      // This is a catch all
      res.writeHead(200, {'Content-Type': 'text/html'});
    }
    res.write(data);
    return res.end();
  });
});


// Function merely converts data from an object to a string.
function convertToString(dirty, ts) {
  dirty.id = uuidv1();
  dirty.created_at = Date();
  dirty.reference_id = ts;
  return JSON.stringify(dirty);
} // end convertToString


// Function is used to send confirmation email.
function sendEmail(email, reference) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.CS350491EMAILUSER,
      pass: process.env.CS350491EMAILPASS
    }
  });

  var mailOptions = {
    from: process.env.CS350491EMAILUSER,
    to: email,
    subject: 'Confirmation email',
    text: "Your information has been received.\nThank you, again, for your feedback.\nYour reference number for further emails is " + reference + "."
  };

  // This block is used to test the mailing server
  /*
    transporter.verify(function(error, success) {
      if (error) {
        console.log('************',error);
      } 
      else {
        console.log('Server is ready to take our messages');
      }
    });
  */

  // Send the email and log the results
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
} // end sendEmail
