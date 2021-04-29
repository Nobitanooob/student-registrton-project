const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.route('/').get((req, res) => {
    return res.render('form.ejs');
});

router.route('/').post(async (req, res) => {
    try {
        if (req.body.confirm_password == req.body.password) {
            let user = await User.create(req.body);
            console.log('user created successfully', user);
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
});


module.exports = router;