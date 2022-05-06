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
    ],
    shared: {
        type: Boolean,
        required: true,
        default: false
    },
    mode: {
        type: String,
        required: false,
        enum: ['read', 'write']
    },
    sharedWith: [
        {
            type: String
        }
    ]
}, {
    timestamps: true,
});

const Model = mongoose.model("Projects", ModelSchema);

module.exports = Model;