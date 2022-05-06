const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'guiratguirat123@gmail.com',
        pass: 'guiratguirat123',
    },
    secure: true,
});

module.exports = transporter;