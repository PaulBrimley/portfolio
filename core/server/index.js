var express = require('express'),
		config = require('./config.js'),
	  cors = require('cors'),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  session = require('express-session'),
	  passport = require('passport'),
	  local = require('passport-local');

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.use(express.static(__dirname + './../../public'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: config.session.sessionSecret,
  saveUninitialized: config.session.saveUninitialized,
  resave: config.session.resave
}));

app.use(passport.initialize());
app.use(passport.session());

var mongoUri = config.mongoUri;
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connected to MongoDB');
});

server.listen(config.port, function () {
  console.log('Listening on port: ' + config.port);
});