const User = require('../models/user');

const otherprofile = (req, res) => {
      User.findOne({
            username: req.params.username
      }, (err, userProfile) => {
            if (err) {
                  console.log('MongoDB Error:' + err);
            } else if (userProfile) {
                  checkMatch(userProfile);
            } else {
                  res.redirect('/notfound');
            }
      });

      const checkMatch = (userProfile) => {
            User.findOne({
                  _id: req.session.sessionID
            }, (err, user) => {
                  if (err) {
                        console.log('MongoDB Error:' + err);
                  } else if (user) {
                        if (userProfile.likes.includes(user._id) && user.likes.includes(userProfile._id)) {
                              res.render('profile-detail', {
                                    data: userProfile,
                                    user: user,
                                    match: true
                              });
                        } else {
                              res.render('profile-detail', {
                                    data: userProfile,
                                    user: user,
                                    match: false
                              });
                        }
                  } else {
                        res.redirect('/login');
                  }

            });
      };
};

module.exports = otherprofile;