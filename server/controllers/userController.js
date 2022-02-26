const userModel = require('../models/userModel');


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
            const newUser = await userModel.findById(id);
            for (let key of Object.getOwnPropertyNames(req.body)) {
                if (key === "email") {
                    newUser.email = req.body[key].toLowerCase();
                }
                else if (key === "password") {
                    newUser.password = await bcrypt.hash(req.body.password, 10);
                }
                else {
                    newUser[key] = req.body[key];
                }
            }
            try {
                const image = req.file.filename;
                if (newUser.image !== "")
                    fs.unlinkSync(path.join('images', 'users', newUser.image));
                newUser.image = image;
            }
            catch (err) {

            }
            const user = await userModel.findByIdAndUpdate(id, newUser);
            res.json(newUser);
            console.log('User updated successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await userModel.findByIdAndDelete(id);
            if (user)
                fs.unlinkSync(path.join('images', 'users', user.image))
            res.json(user);
            console.log('User deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    }

};


module.exports = userController;