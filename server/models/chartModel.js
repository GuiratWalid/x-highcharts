const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: Object,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: false
    },
}, {
    timestamps: true,
});

const Model = mongoose.model("Charts", ModelSchema);

module.exports = Model;