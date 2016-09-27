var express = require('express'),
	config = require('./config.js'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	passport = require('passport'),
	path = require("path");
	local = require('passport-local');

var	projectCtrl = require('./controllers/projectController');

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
		imageUrl: 'http://www.spyderonlines.com/images/wallpapers/cool-hd-nature-wallpapers/cool-hd-nature-wallpapers-2.jpg',
		imageTitle: 'Five'
	},
	{
		imageUrl: 'http://media.148apps.com/screenshots/918109487/us-ipad-2-awesome-cool-nature-hd-wallpapers-get-best-natural-pictures-and-beautiful-world-of-natural-greenery.jpeg',
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


app.post('/addProject', projectCtrl.addProject, projectCtrl.getProjects);
app.get('/getProjects', projectCtrl.getProjects);

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