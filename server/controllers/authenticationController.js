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
        const userExists = await userModel.findOne({ email });
        if (!(email && password && firstName && lastName && gender && birthDate)) {
            console.log('FirstName, lastName, email, password, gender and birthDate are required')
            res.status(400).send({ message: 'FirstName, lastName, email, password, gender and birthDate are required' });
        }
        else if (gender !== "male" && gender !== "female") {
            console.log('Gender should be male or female !!!');
            res.json({ message: 'Gender should be male or female !!!' });
        }
        else if (password.length < 6) {
            console.log('Password should contain at least 6 Characters !!!');
            res.json({ message: 'Password should contain at least 6 Characters !!!' });
        }
        else if (userExists) {
            console.log('User is already used !!! ');
            res.json({ message: 'User is already used !!!' });
        }
        else {
            const passwordHash = await bcrypt.hash(password, 10);
            let image;
            try {
                image = req.file.path;
            }
            catch (err) {
                image = ''
            }
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
                console.log('User added successfully !!! ');
                res.json({ token: accessToken });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Server Error' });
            }
        }
    },

    login: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        try {
            const userExists = await userModel.findOne({ email });
            if (!(email && password)) {
                console.log('Email and password are required')
                res.status(400).send({ message: 'Email and password are required' });
            }
            else if (userExists && (await bcrypt.compare(password, userExists.password))) {
                const accessToken = createAccessToken({ id: userExists._id });
                console.log("Token : " + accessToken);
                res.json({ token: accessToken });
            }
            else if (!userExists) {
                console.log(`User invalid`);
                res.status(400).send({ message: 'User invalid' });
            }
            else {
                console.log(`Password incorrect`);
                res.status(400).send({ message: 'Password incorrect' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
            console.log(err);
        }
    }

};

const createAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '2h'
        }
    );
}

module.exports = authenticationController;