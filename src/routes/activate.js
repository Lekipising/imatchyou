const User = require('../models/user');

const activate = (req, res) => {
    User.findOne({
		_id: req.query.id
	}, (err, user) => {
		if (err) {
            console.log('MongoDB Error:' + err);
            res.render('login', {
                message: 'Account activation failed, please try again or contact us.'
            });
		} else if (user.activated == 0) {
            User.update({ _id: user._id }, { activated: 1 }, {upsert: true}, (err) => {
                if (err) {
                    console.log(err);
                    res.render('activate-failed');
                } else {
                    res.render('login', {
                        message: 'Your account has been activated! You can now log in.'
                    });
                }
            });
		} else if (user.activated == 1) {
            res.render('login', {
                message: 'Your account has already been activated.'
            });
        } else {
            console.log('Error: client ID could not been found!');
            res.render('login', {
                message: 'Account activation failed, please try again or contact us.'
            });
		}
	});
};

module.exports = activate;