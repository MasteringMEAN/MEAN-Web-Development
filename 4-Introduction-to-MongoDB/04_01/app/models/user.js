var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		match: /.+\@.+\..+/
	},
	username: {
		type: String,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		validate: [
			function(password) {
				return password.length > 6;
			}, 'Password should longer'
		]
	},
	website: {
		type: String,
		set: function(url) {
			if (!url) {
				return null;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
					url = 'http://' + url;
				}

				return url;
			}
		}
	},
	role: {
		type: String,
		enum: ['Admin', 'Owner', 'User']
	},
	created: {
		type: Date,
		default: Date.now
	}
});


UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

UserSchema.methods.authenticate = function(password) {
	return this.password === password;
};


UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);