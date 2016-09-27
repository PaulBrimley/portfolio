module.exports = {
	port: 9909,
	mongoUri: 'mongodb://localhost:27017/portfolio',
	session: {
		sessionSecret: '20eggnog14',
		saveUninitialized: 'true',
		resave: true
	},
	keyCode: 'mylab'
};