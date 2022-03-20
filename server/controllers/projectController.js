const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');


const projectController = {

    get: async (req, res) => {
        const id = req.params.id;
        try {
            const project = await projectModel.findById(id);
            res.json(project);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    getAll: async (req, res) => {
        try {
            const projects = await projectModel.find();
            res.json(projects);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    add: async (req, res) => {
        try {
            const { name, owner, charts } = req.body;
            if (!name) {
                console.log('Name is required');
                return res.json({ message: 'Name is required' });
            }
            const project = await projectModel.create({ name, owner, charts });
            if (owner) {
                const user = await userModel.findById(owner);
                user.projects.push(project._id);
                await user.save();
            }
            res.json({ message: 'Project added successfully' });
            console.log('Project added successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    update: async (req, res) => {
        try {
            let project = {};
            const id = req.params.id;
            const { name, owner, charts } = req.body;
            if (name)
                project = { ...project, name };
            if (owner)
                project = { ...project, owner };
            if (charts)
                project = { ...project, charts };
            await projectModel.findByIdAndUpdate(id, project);
            console.log('project updated successfully');
            res.json({ message: 'project updated successfully' });
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const project = await projectModel.findByIdAndDelete(id);
            if (project.owner) {
                const user = await userModel.findById(project.owner);
                user.projects = user.projects.filter(item => item !== project._id);
                await user.save();
            }
            res.json({ message: 'Project deleted successfully' });
            console.log('Project deleted successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteAll: async (req, res) => {
        try {
            await projectModel.deleteMany();
            res.json({ message: 'All projects are deleted successfully' });
            console.log('All projects are deleted successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

};


module.exports = projectController;