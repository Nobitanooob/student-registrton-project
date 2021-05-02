const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Reg_Form = require('../models/registration_form');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/form/:id',passport.checkAuthentication, (req, res) => {
    try {
        Reg_Form.uploadedFile(req, res, (err) => {
                if (err) {
                    console.log(`*********multer error***************`, err);
                    return res.json({
                        message: "multer error",
                        err
                    });
                 }
            // creating form
                Reg_Form.create({
                    name: req.body.name,
                    email: req.body.email,
                    department: req.body.department,
                    semester: req.body.semester,
                    studentId: req.params.id,
                    file: Reg_Form.filePath + '/' + req.file.filename
                }, (err, form) => {
                    if (err) {
                        console.log('error in creating form :', err);
                        // if form creating gets error
                        // saved file will be deleted from storage 
                        fs.unlinkSync(path.join(__dirname,'..',Reg_Form.filePath+'/'+req.file.filename));
                        return res.json({
                            message: `'error in creating form :', ${err}`
                        });
                    }
                    console.log(form);
                    // when form is made 
                    // pushing forms into student
                    User.findById(req.params.id, (err, student) => {
                        if (err)
                        {
                            console.log(err);
                            return res.json({ err });
                        }
                        student.forms.push(form);
                        student.save();
                    });
    
                    return res.json({
                        message: "form created successfully"
                    })   // to do later               
                });
    });
    } catch (error) {
        console.log('error in reg', error);
        return res.json({
            mesaage: error
        });
    }
})



module.exports = router;