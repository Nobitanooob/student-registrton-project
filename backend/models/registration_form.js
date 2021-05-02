const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/users');

const reg_form_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    file: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

reg_form_schema.index({ email: 1, semester: 1 }, { unique: true });

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', FILE_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ '-' + file.originalname)
    }
});

reg_form_schema.statics.uploadedFile = multer({
    storage: storage,
    limits : {fileSize :  5*1000000} //5*1MB
}).single('registrationForm');
reg_form_schema.statics.filePath = FILE_PATH;

const Reg_Form = mongoose.model('Reg_Form', reg_form_schema);
module.exports = Reg_Form;