const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Reg_Form = require('../models/registration_form');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', '/uploads/reg');

router.post('/form/:id', async (req, res) => {
    try {
        if (req.files === null)
        {
            return res.status(400).json({
                message: "file not uploaded"
            });
        }
        console.log(req.files);
        let file = req.files.file;
        console.log(req.body.email);
        let dir = path.join(FILE_PATH,req.body.email,req.body.semester);
        if (!fs.existsSync(dir))
        {
            fs.mkdirSync(dir, { recursive: true });
        }
        file.mv(path.join(dir,file.name), async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        
            // create registration form
            let form = {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                semester: req.body.semester,
                userId: req.params.id,
                file: path.join(dir, file.name)
            }
            let newForm = await Reg_Form.create(form);
            console.log('newform', newForm);
            // updating reg form in user
            let user = await User.findById(req.params.id);
            user.forms.push(newForm.id);
            console.log('user', user);
            return res.json({
                message: 'File uploaded!!',
                newForm
            });
        });
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'error in uploading file'
        })
    }
});



module.exports = router;