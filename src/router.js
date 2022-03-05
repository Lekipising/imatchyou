const router = require('express').Router();

// Utils
const 
    upload = require('./utils/uploadImage'),
    userRedirectLogin = require('./utils/userRedirectLogin'),
    userRedirectProfile = require('./utils/userRedirectProfile');

// Routes
const
    registerpost = require('./routes/registerpost'),
    register = require('./routes/register'),
    index = require('./routes/index'),
    loginpost = require('./routes/loginpost'),
    logout = require('./routes/logout'),
    profile = require('./routes/profile'),
    activate = require('./routes/activate'),
    search = require('./routes/search'),
    profilepost = require('./routes/profilepost'),
    login = require('./routes/login'),
    otherprofile = require('./routes/otherprofile'),
    matches = require('./routes/matches'),
    unmatch = require('./routes/unmatch'),
    notfound = require('./routes/notfound'),
    likepost = require('./routes/likepost');

router
    .get('/', index)
    .get('/login', userRedirectProfile, login)
    .get('/register', userRedirectProfile, register)
    .get('/logout', userRedirectLogin, logout)
    .get('/profile', userRedirectLogin, profile)
    .get('/matches', userRedirectLogin, matches)
    .get('/activate', activate)
    .get('/otherprofile/:username', otherprofile)
    .get('/search', userRedirectLogin, search)
    .get('/apipage', index)
    .get('*', notfound)
    
    .post('/apipage', index)
    .post('/unmatch', unmatch)
    .post('/like', likepost)
    .post('/login', loginpost)
    .post('/search', search)
    .post('/profile', profilepost)
    .post('/other-profile-match', unmatch)
    .post('/register', upload.single('signupAvatar'), registerpost);

module.exports = router;