const bcrypt = require('bcrypt');

function comparePassword (userPassword, callback) {
	bcrypt.compare(userPassword, this.password, (err, matches) => {
		if (err) {
			console.log(err);
		} else {
			callback(undefined, matches);
		}
	});
}

module.exports = comparePassword;