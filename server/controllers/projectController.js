const projectModel = require('../models/projectModel');
const chartModel = require('../models/chartModel');
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

    getUser: async (req, res) => {
        const id = req.params.id;
        try {
            const projects = await projectModel.find({ owner: id });
            res.json(projects);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    getSharedProjects: async (req, res) => {
        const id = req.params.id;
        try {
            const userExists = await userModel.findById(id);
            if (!userExists) {
                console.log('Invalid User');
                return res.json({ message: 'Invalid User' });
            }
            else {
                const projects = await projectModel.find({ sharedWith: { $elemMatch: { $eq: userExists.email } } });
                res.json(projects);
            }
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
            const project = await projectModel.create({ name, owner, charts, sharedWith: [] });
            res.json({ project: project, message: 'Project added successfully' });
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
            await projectModel.findByIdAndDelete(id);
            await chartModel.deleteMany({ project: id });
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

    share: async (req, res) => {
        try {
            let { shared, email, mode } = req.body;
            const { id } = req.params;
            email = email.toLowerCase();
            if (!email) {
                console.log('Email is required');
                return res.json({ message: 'Email is required' });
            }
            else if (mode !== 'write' && mode !== 'read') {
                console.log('Invalid mode');
                return res.json({ message: 'Invalid mode' });
            }
            else {
                const userExists = await userModel.findOne({ email });
                if (!userExists) {
                    console.log('Invalid User');
                    return res.json({ message: 'Invalid User' });
                }
                else {
                    const project = await projectModel.findById(id);
                    if (project._doc.sharedWith.includes(email)) {
                        console.log(`Project is already shared with ${email}`);
                        return res.json({ message: `Project is already shared with ${email}` });
                    }
                    else {
                        await projectModel.findByIdAndUpdate(id, { ...project._doc, shared, mode, sharedWith: [...project.sharedWith, email] });
                        res.json({ message: 'Project shared successfully' });
                        console.log('Project shared successfully');
                    }
                }
            }
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

};


module.exports = projectController;