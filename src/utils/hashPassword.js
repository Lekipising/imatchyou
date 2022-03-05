const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword (next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	const hashPassword = (salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				console.log(err);
			} else {
				user.password = hash;
				next();
			}
		});
	};

	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) {
			console.log(err);
		} else {
			hashPassword(salt);
		}
	});
}

module.exports = hashPassword;