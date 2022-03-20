const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    charts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Charts',
            required: false
        }
    ]
}, {
    timestamps: true,
});

const Model = mongoose.model("Projects", ModelSchema);

module.exports = Model;