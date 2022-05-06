const userModel = require('../models/userModel');

// encrypted password
const bcrypt = require('bcrypt');

// web token
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

// import images
const fs = require('fs');
const path = require('path');

// sending email
const transporter = require('../configurations/nodeMailing');

const authenticationController = {

    register: async (req, res) => {
        const {
            firstName,
            lastName,
            email,
            password,
            gender,
            birthDate
        } = req.body;
        let image;
        try {
            image = req.file.filename;
        }
        catch (err) {
            image = ''
        };
        const userExists = await userModel.findOne({ email });
        if (!(email && password && firstName && lastName && gender && birthDate)) {
            if (image != "")
                fs.unlinkSync(path.join('images', 'users', image));
            console.log('FirstName, LastName, Email, Password, Gender And Birth Date Are Required');
            res.send({ message: 'FirstName, LastName, Email, Password, Gender And Birth Date Are Required' });
        }
        else if (userExists !== null) {
            if (image != "")
                fs.unlinkSync(path.join('images', 'users', image));
            console.log('Email Is Already Used');
            res.json({ message: 'Email Is Already Used' });
        }
        else if (password.length < 6) {
            if (image != "")
                fs.unlinkSync(path.join('images', 'users', image));
            console.log('Password Should Contain At Least 6 Characters');
            res.json({ message: 'Password Should Contain At Least 6 Characters' });
        }
        else if (gender !== "male" && gender !== "female") {
            if (image != "")
                fs.unlinkSync(path.join('images', 'users', image));
            console.log('Gender Should Be Male Or Female');
            res.json({ message: 'Gender Should Be Male Or Female' });
        }
        else {
            const passwordHash = await bcrypt.hash(password, 10);
            const user = new userModel({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: passwordHash,
                gender,
                birthDate,
                image
            });
            try {
                await user.save();
                const accessToken = createAccessToken({ id: user._id });
                console.log('Account Create Successfully');
                res.json({ token: accessToken, message: 'Account Create Successfully' });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Server Error' });
            }
        }
    },

    login: async (req, res) => {
        let {
            email,
            password
        } = req.body;
        email = email.toLowerCase();
        try {
            const userExists = await userModel.findOne({ email });
            if (!(email && password)) {
                console.log('Email and password are required')
                res.send({ message: 'Email and password are required' });
            }
            else if (userExists && (await bcrypt.compare(password, userExists.password))) {
                const accessToken = createAccessToken({ id: userExists._id });
                console.log("Token : " + accessToken);
                res.json({ token: accessToken });
            }
            else if (!userExists) {
                console.log(`User invalid`);
                res.send({ message: 'User invalid' });
            }
            else {
                console.log(`Password incorrect`);
                res.send({ message: 'Password incorrect' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
            console.log(err);
        }
    },

    passwordForgotten: async (req, res) => {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user == undefined) {
            console.log(`Email Invalid`);
            res.send({ message: 'Email Invalid' });
        }
        else {
            const mailData = {
                from: 'guiratguirat123@gmail.com',
                to: email,
                subject: 'Password Forgotten | X-Highcharts',
                html: `<div style="text-align:center;">
                        <h1 style="color:rgb(87,73,173)">Password Forgotten</h1><br/><br/>
                        <p>To change your password, please click to the link below :</p><br/>
                        <a href="http://localhost:3000/changePassword/${user.id}">http://x-highcharts:3000/changePassword/${user.id}</a><br/><br/><br/>
                        <p style="color:gray">© ${(new Date()).getFullYear()} Copyright : <a href="http://localhost:3000">www.X-Highcharts.com</a></p>
                    </div>`,
            };
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.log(`Server Error`);
                    console.log(err);
                    res.status(500).send({ message: 'Server Error' });
                }
                else {
                    console.log(info);
                    res.status(200).send({ message: 'Email Sended Successfully' });
                }
            });
        }
    },

    changePassword: async (req, res) => {
        const id = req.params.id;
        let { password } = req.body;
        if (password.length < 6) {
            res.json({ message: 'Password Should Contain At Least 6 Characters' });
            console.log('Password Should Contain At Least 6 Characters');
        }
        else
            try {
                password = await bcrypt.hash(req.body.password, 10);
                await userModel.findByIdAndUpdate(id, { password });
                res.json({ message: 'Password Changed Successfully' });
                console.log('Password Changed Successfully');
            } catch (err) {
                res.json({ message: 'Invalid User' });
                console.log(err);
            }
    },

};


const createAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '24h'
        }
    );
}

module.exports = authenticationController;