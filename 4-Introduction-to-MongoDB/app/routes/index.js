module.exports = function(app) {
	var index = require('../controllers/index');
	app.get('/', index.render);
};