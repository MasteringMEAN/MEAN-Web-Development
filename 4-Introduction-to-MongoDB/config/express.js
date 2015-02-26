var express = require('express'),
	config = require('./config');

module.exports = function() {
	var app = express();

	require('../app/models/user');

	app.configure(function() {
		app.use(express.logger('dev'));

		app.use(express.json());
		app.use(express.urlencoded());

		app.use(express.cookieParser());
		app.use(express.session({
			secret: config.sessionSecret
		}));

		app.set('views', __dirname + '/../app/views');
		app.set('view engine', config.viewEngine);
	});

	app.configure('production', function() {
		app.use(express.compress());
	});

	require('../app/routes/index.js')(app);
	require('../app/routes/users.js')(app);

	app.configure(function() {
		app.use(express.static(__dirname + '/../public'));
	});

	return app;
};