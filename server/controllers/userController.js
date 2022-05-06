const userModel = require('../models/userModel');
const chartModel = require('../models/chartModel');
const projectModel = require('../models/projectModel');


// encrypted password
const bcrypt = require('bcrypt');

// import images
const fs = require('fs');
const path = require('path');

const userController = {

    get: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await userModel.findById(id);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.send(400).json({ message: 'Server Error' });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        try {
            let user = {};
            for (let key of Object.getOwnPropertyNames(req.body)) {
                if (key === "email") {
                    const userExists = await userModel.findOne({ email: req.body[key] });
                    if (userExists) {
                        console.log('Email Is Already Used');
                        return res.json({ message: 'Email Is Already Used' });
                    }
                    else
                        user = { ...user, email: req.body[key].toLowerCase() };
                }
                else if (key === "password") {
                    if (req.body[key].length < 6) {
                        console.log('Password Should Contain At Least 6 Characters');
                        return res.json({ message: 'Password Should Contain At Least 6 Characters' });
                    }
                    else {
                        const password = await bcrypt.hash(req.body.password, 10);
                        user = { ...user, password };
                    }
                }
                else if (key === "gender") {
                    if (req.body[key] !== "male" && req.body[key] !== "female") {
                        console.log('Gender Should Be Male Or Female');
                        return res.json({ message: 'Gender Should Be Male Or Female' });
                    }
                    else
                        user = { ...user, gender: req.body[key] };
                }
                else {
                    user[key] = req.body[key];
                }
            }
            await userModel.findByIdAndUpdate(id, user);
            res.json({ message: 'User updated successfully' });
            console.log('User updated successfully');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    changeImage: async (req, res) => {
        const id = req.params.id;
        let image;
        try {
            image = req.file.filename;
        }
        catch (err) {
            image = '';
        };
        try {
            const userExists = await userModel.findByIdAndUpdate(id, { image });
            if (userExists.image !== "")
                fs.unlinkSync(path.join('images', 'users', userExists.image));
            res.json({ message: 'Image Changed Successfully' });
            console.log('Image Changed Successfully');
        }
        catch (err) {
            res.json({ message: 'Invalid User' });
            console.log('Invalid User');
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await userModel.findByIdAndDelete(id);
            await chartModel.deleteMany({ owner: id });
            await projectModel.deleteMany({ owner: id });
            if (user)
                if (user.image != "")
                    fs.unlinkSync(path.join('images', 'users', user.image))
            res.json({ message: 'User deleted successfully' });
            console.log('User deleted successfully');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    }

};


module.exports = userController;