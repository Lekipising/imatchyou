const User = require('../models/user');
const executeEmail = require('../utils/executeEmail');
var cloudinary = require('cloudinary').v2;
let dotenv = require('dotenv');
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  });


const registerpost = (req, res) => {
    const sendEmail = () => {
        User.findOne({
            username: req.body.signupUser
        }, (err, user) => {
            if (err) {
                console.log('MongoDB Error:' + err);
            } else if (user) {
                let mailOptions = {
                    from: 'Linka App <mfriendshippp@gmail.com>',
                    to: user.email,
                    subject: 'Welcome to Linka App, ' + user.firstname + '!',
                    text: 'Hi ' + user.firstname + '!,\nPlease activate your account by going to this url: http://' + req.get('host') + '/activate?id=' + user._id
                };
                executeEmail(mailOptions);
            }
        });
    };
    
        const uploadUser = () => {
            cloudinary.uploader.upload(req.file.path)
        .then(function (image) {
          console.log('** file uploaded to Cloudinary service');
          console.dir(image);
          const newUser = new User();
        newUser.username = req.body.signupUser;
        newUser.password = req.body.signupPassword;
        newUser.email = req.body.signupEmail.toLowerCase();
        newUser.firstname = req.body.signupFirst;
        newUser.dob = req.body.signupAge;
        newUser.location = req.body.signupLocation;
        newUser.interests = req.body.signupInterests.toLowerCase().split(',');
        newUser.description = req.body.signupDescription;
        newUser.avatar = image.secure_url;
        newUser.activated = 0;

        newUser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render('login', {
                    message: 'Please check your email inbox and activate your account by clicking on the link in the email!'
                });
                sendEmail();
            }
        });
        })
        .then(function () {
          console.log('** photo saved');
        }).catch(function (err) {
            console.log(err);
        });
    };
        

    User.findOne({
        username: req.body.signupUser
    }, (err, user) => {
        if (err) {
            console.log('MongoDB Error:' + err);
        } else if (user || !req.file) {
            res.render('register', {
                data: req.body
            });
        } else {
            uploadUser();
        }
    });
};

module.exports = registerpost;