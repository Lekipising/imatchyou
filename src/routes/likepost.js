const User = require('../models/user');

const likepost = (req, res) => {
    // Hier zoek je de ingelogde user, en voer je de userLiked functie uit als de user gevonden is.
    User.findOne({
        _id: req.session.sessionID
    }, (err, user) => {
        if (err) {
            console.log('MongoDB Error:' + err);
        }
        else if (user) {
            userLiked();
        } else {
            console.log('Error: client ID could not been found!');
        }
    });

    // Hier zoek je op de user die je hebt geliked (req.body.like), en check je of deze user jou ook heeft geliked. Als dat zo is kan je dat direct renderen op een pagina.
    const checkIfUserLiked = (userProfile) => {
        User.findOne({
            _id: req.body.like
        }, (err, user) => {
            if (err) {
                console.log('MongoDB Error:' + err);
            } else if (user) {
                if (userProfile.likes.includes(user._id) && user.likes.includes(userProfile._id)) {
                    res.render('profile-detail', {
                        data: user,
                        user: userProfile,
                        match: true,
                        matchData: true
                });
                } else {
                    res.redirect('/');
                }
            }
        });
    };

    const SearchMyUser = () =>{
        User.findOne({
            _id: req.session.sessionID
        }, (err, user) => {
            if (err) {
                console.log('MongoDB Error:' + err);
            }
            else {
                checkIfUserLiked(user);
            }
        });
    };

    // Hier zoek je weer de ingelogde user en voeg je de id toe van de gelikede user in zijn/haar database.
    const userLiked = () => {
        User.updateOne({
                _id: req.session.sessionID
            }, {
                $push: {
                    likes: req.body.like
                }
            },
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    SearchMyUser();

                }
            }
        );
    };
};

 module.exports = likepost;
