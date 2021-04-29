const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    department: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Reg_Form'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userschema);
module.exports = User;