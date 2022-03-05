const User = require('../models/user');

const unmatch = (req, res) => {
    User.findOne({
        _id: req.session.sessionID
    }, (err, user) => {
        if (err) {
            console.log('MongoDB Error:' + err);
        }
        if (user) {
            User.updateOne({
                _id: req.session.sessionID
            }, {
                $pull: {
                    likes: req.body.unmatch
                }
            }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/matches');
                }
            });
        } else {
            console.log('Error: client ID could not been found!');
        }
    });
};

module.exports = unmatch;