const nodemailer = require('nodemailer');

const executeEmail = (mailOptions) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return console.log('Nodemailer error: ' + err);
        }
        return;
    });
};

module.exports = executeEmail;