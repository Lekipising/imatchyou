const User = require('../models/user');

const loginpost = (req, res) => {
    const findUser = () => {
        User.findOne({
            email: req.body.loginEmail.toLowerCase()
        }, (err, user) => {
            if (err) {
                console.log('MongoDB Error:' + err);
            } else if (user && user.activated == 1) {
                checkPassword(user);
            } else if (user && user.activated == 0) {
                res.render('login', {
                    data: req.body
                });
            } else {
                res.render('login', {
                    data: req.body
                });
            }
        });
    };

    const checkPassword = (user) => {
        user.comparePassword(req.body.loginPassword, (err, matches) => {
            if (err) {
                console.log(err);
            } else if (matches) {
                req.session.sessionID = user._id;
                res.redirect('profile');
            } else if (!matches) {
                res.render('login', {
                    data: req.body
                });
            }
        });
    };

    if (req.body.loginEmail && req.body.loginPassword) {
        findUser();
    } else {
        res.render('login', {
            data: req.body
        });
    }
};

module.exports = loginpost;