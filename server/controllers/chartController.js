const chartModel = require('../models/chartModel');
const userModel = require('../models/userModel');


const chartController = {

    get: async (req, res) => {
        const id = req.params.id;
        try {
            const chart = await chartModel.findById(id);
            res.json(chart);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    getAll: async (req, res) => {
        try {
            const charts = await chartModel.find();
            res.json(charts);
        } catch (err) {
            console.log(err);
            res.json({ message: 'Server Error' });
        }
    },

    add: async (req, res) => {
        try {
            const { name, options, owner, project } = req.body;
            if (!name) {
                console.log('Name is required');
                return res.json({ message: 'Name is required' });
            }
            if (!options) {
                console.log('Options are required');
                return res.json({ message: 'Options are required' });
            }
            let chart = { name, options, owner, project };
            chart = await chartModel.create(chart);
            if (owner) {
                const user = await userModel.findById(owner);
                user.charts.push(chart._id);
                await user.save();
            }
            res.json({ message: 'Chart added successfully' });
            console.log('Chart added successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    update: async (req, res) => {
        try {
            let chart = {};
            const id = req.params.id;
            const { name, options, owner, project } = req.body;
            if (name)
                chart = { ...chart, name };
            if (options)
                chart = { ...chart, options };
            if (owner)
                chart = { ...chart, owner };
            if (project)
                chart = { ...chart, project };
            await chartModel.findByIdAndUpdate(id, chart);
            console.log('chart updated successfully');
            res.json({ message: 'chart updated successfully' });
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const chart = await chartModel.findByIdAndDelete(id);
            if (chart.owner) {
                const user = await userModel.findById(chart.owner);
                user.charts = user.charts.filter(item => item !== chart._id);
                await user.save();
            }
            res.json({ message: 'chart deleted successfully' });
            console.log('chart deleted successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteAll: async (req, res) => {
        try {
            await chartModel.deleteMany();
            res.json({ message: 'All charts are deleted successfully' });
            console.log('All charts are deleted successfully');
        } catch (err) {
            res.json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

};


module.exports = chartController;