const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    birthDate: {
        type: Date,
        required: true
    },
    image: {
        type: String
    },
    charts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Charts',
            default: [],
            required: false
        }
    ]
    ,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projects',
            default: [],
            required: false
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;