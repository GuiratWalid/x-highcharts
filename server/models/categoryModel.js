const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Model = mongoose.model("Categories", ModelSchema);

module.exports = Model;