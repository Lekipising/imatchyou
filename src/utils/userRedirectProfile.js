const userRedirectProfile = (req, res, next) => {
    if (req.session.sessionID) {
        res.redirect('/profile');
    } else {
        next();
    }
};

module.exports = userRedirectProfile;