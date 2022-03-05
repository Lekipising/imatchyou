const User = require('../models/user');

const matches = (req, res) => {
    const matchesItems = [];
    User.findOne({
        _id: req.session.sessionID
    }, (err, user) => {
        if (err) {
            console.log('MongoDB Error:' + err);
        } else if (user) {
            User.find({}, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // does the same thing, for loop vs for each
                    result.forEach((userItem) => {
                        if (userItem.likes.includes(user._id) && user.likes.includes(userItem._id)) {
                            matchesItems.push(userItem);
                        }
                    });
                    res.render('matches', {
                        data: matchesItems,
                        user: user
                    });
                }
            });
        } else {
            console.log('Error: client ID could not been found!');
        }
    });
};


module.exports = matches;