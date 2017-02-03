//-------------------------Module "Importing"-----------------------------//
// modules required (same idea of #includes or Imports)

var express = require('express'); //used as routing framework
var app = express(); //creates an instance of express

var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var server = require('http').createServer(app); //creates an HTTP server instance
var ip = require("ip").address(); //used to know where to check for web view site
var execFile = require('child_process').execFile; //used to run a file on a child process
var argv = require('minimist')(process.argv.slice(2)); //used for easy param parsing

//------------------------ Checks flags --------------------------------//

if (argv.help) {
    console.log("How to run\n\tnode server.js path/to/my/script/executable <options>\n");
    console.log("Options:");
    console.log("-p\n\tPass a port number otherwise default is 5000");
    process.exit(1);
}

// checks for a script
if (!process.argv[2]) {
    console.log("You need to pass the path to your script\n\ntry:\n\tnode server.js path/to/my/script/executable\n");
    console.log("For more options type:\n\tnode server.js --help");
    process.exit(1);
}

//------------------------Express JS setup -------------------------------//
app.use(logger('dev')); //debugs logs in terminal
app.use(express.static(path.join(__dirname, 'front_end'))); //sets all static file calls to folder

//----------------------- Routes -----------------------------------//

// root get request to get webpage in front_end folder
app.get('/', function(req, res, next) {
    res.sendFile('index.html');
});

// call to data with string to pass in url
app.get('/script/:input', function(req, res) {

    var input = req.params.input; //gets input from url get request

    var child = execFile('./' + process.argv[2], [input], (error, stdout, stderr) => {
	if (error) {
	    return res.send("SCRIPT THREW ERROR!"); // exit function
	    throw error;
	}
	res.send(stdout); // dont return function
	console.log(stdout);
    });

    // runs when script closes
    child.on("close", (code, signal) => {
	console.log("script closed");
	console.log("return code: " + code);
	console.log("Signal triggered: " + signal);
    })

    // runs if script throws an error
    child.on("error", (err) => {
	console.log("ERROR:");
	console.error(err);
    })
});


// ------------ Server Setup --------------//


/**
 * Get port from environment and store in Express.
 */
var port = argv.p || 5000;
if (port == NaN || port < 0 || port > 65536) {
    console.log("Port number needs to be between 1 - 65536");
    process.exit(1);
}
// some services like Azure need to use the PORT enviroment variable
port = normalizePort(process.env.PORT || port);
app.set('port', port);

/**
 * Listen on port, callback on success or fail
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    console.log('Broadcast on local IP ' + ip);
    console.log('------------------------------');
    console.log('View site at http://localhost:' + port);
}
