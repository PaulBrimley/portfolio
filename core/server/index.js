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

var proj1 = [
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'One'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Two'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Three'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Four'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Five'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Six'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Seven'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Eight'
	}
];

var proj2 = [
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'One'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Two'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Three'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Four'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Five'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Six'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Seven'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Eight'
	}
];

var proj3 = [
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'One'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Two'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Three'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Four'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Five'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Six'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Seven'
	},
	{
		imageUrl: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg',
		imageTitle: 'Eight'
	}
];

app.use(passport.initialize());
app.use(passport.session());


app.get('/getTempData', function(req, res) {
	// res.send({proj1: proj1, proj2: proj2, proj3: proj3});
	res.send([{title: 'Project 1', data: proj1}, {title: 'Project 2', data: proj2}, {title: 'Project 3', data: proj3}]);
});

var mongoUri = config.mongoUri;
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connected to MongoDB');
});

server.listen(config.port, function () {
  console.log('Listening on port: ' + config.port);
});