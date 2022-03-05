const User = require('../models/user');


const profilepost = (req, res) => {
    const updatedValues = {};

    const checkUsername = (user) => {
        if (req.body.editUser != user.username) {
            User.findOne({
                username: req.body.editUser
            }, (err, username) => {
                if (err) {
                    console.log('MongoDB Error:' + err);
                } else if (username) {
                    res.render('profile', {
                        'user': user,
                        data: req.body
                    });
                } else {
                    updatedValues.username = req.body.editUser;
                    updateData(user);
                }
            });
        } else {
            updateData(user);
        }  
    };

    const editInfo = () => {
        updatedValues.location = req.body.editLocation;
        updatedValues.description = req.body.editDescription;
        updatedValues.interests = req.body.editInterests.toLowerCase().split(',');
    };

    const updateData = (user) => {
        User.findOneAndUpdate({
            _id: user._id
        }, {
            $set: updatedValues
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    // Changing avatar is not implemented yet
    const updateImage = () => {
        if (req.file) {
            const img = 'uploads/' + req.file.path.split('/').pop();
            updatedValues.avatar = img;
        }
    };

    const editProfile = (user) => {
        editInfo(user);
        updateImage();
        checkUsername(user);
        res.redirect('/login');
    };

    User.findOne({
        _id: req.session.sessionID
    }, (err, user) => {
        if (err) {
            console.log('MongoDB Error:' + err);
        } else {
            editProfile(user);
        }
    });
};

module.exports = profilepost;