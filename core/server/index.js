var express = require('express'),
	config = require('./config.js'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	passport = require('passport'),
	path = require("path"),
	request = require('request'),
	http = require('http'),
	local = require('passport-local');

var	projectCtrl = require('./controllers/projectController');

var app = express();
var server = http.Server(app);
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

var linkSet = false;

app.post('/addProject', projectCtrl.addProject, projectCtrl.getProjects);
app.get('/checkLink', function (req, res) {
	if (linkSet) {
		res.send(true);
	} else {
		res.send(false);
	}
});
app.get('/clearLink', function (req, res) {
	linkSet = false;
	res.send(false);
});
app.get('/getProjects', projectCtrl.getProjects);
app.post('/updateProject', projectCtrl.updateProject);
app.post('/testName', function (req, res) {
	console.log(req.body);
	if (req.body.name === config.keyCode) {
		linkSet = true;
		return res.send(true);
	} else {
		return res.send(false);
	}
});

app.get(/^(?!.*(images))/, function (req, res) {
	res.sendFile(path.resolve(__dirname + './../../public/index.html'));
});

var mongoUri = config.mongoUri;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connected to MongoDB');
});

server.listen(config.port, function () {
  console.log('Listening on port: ' + config.port);
});