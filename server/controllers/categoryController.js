const categoryModel = require('../models/categoryModel');


// import images
const fs = require('fs');
const path = require('path');

const categoryController = {

    get: async (req, res) => {
        const id = req.params.id;
        try {
            const category = await categoryModel.findById(id);
            res.json(category);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    getAll: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.json(categories);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    add: async (req, res) => {
        try {
            const { name, type } = req.body;
            if (!name) {
                console.log('Name is required');
                return res.json({ message: 'Name is required' });
            }
            if (!type) {
                console.log('Type is required');
                return res.json({ message: 'Type is required' });
            }
            let image;
            try {
                image = req.file.filename;
            }
            catch (err) {
                console.log('Image is required');
                return res.json({ message: 'Image is required' });
            }
            await categoryModel.create({ name, type, image });
            res.json({ message: 'Category added successfully' });
            console.log('Category added successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    update: async (req, res) => {
        try {
            let category = {};
            const id = req.params.id;
            try {
                const image = req.file.filename;
                category = { ...category, image };
            }
            catch (err) {
            }
            const { name, type } = req.body;
            if (name)
                category = { ...category, name };
            if (type)
                category = { ...category, type };
            const prevCategory = await categoryModel.findByIdAndUpdate(id, category);
            if (category.image)
                fs.unlinkSync(path.join('images', 'categories', prevCategory.image))
            console.log('Category updated successfully');
            res.json({ message: 'Category updated successfully' });
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await categoryModel.findByIdAndDelete(id);
            if (category)
                fs.unlinkSync(path.join('images', 'categories', category.image))
            res.json({ message: 'Category deleted successfully' });
            console.log('Category deleted successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteAll: async (req, res) => {
        try {
            await categoryModel.deleteMany();
            fs.readdir(path.join('images', 'categories'), (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(path.join('images', 'categories'), file), err => {
                        if (err) throw err;
                    });
                }
            });
            res.json({ message: 'All categories are deleted successfully' });
            console.log('All categories are deleted successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

};


module.exports = categoryController;