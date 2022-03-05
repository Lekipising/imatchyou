const userRedirectLogin = (req, res, next) => {
    if (!req.session.sessionID) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = userRedirectLogin;