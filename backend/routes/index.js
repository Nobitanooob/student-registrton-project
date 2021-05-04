const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.use('/create-student', require('./createStudents'));

router.use('/student', require('./student'));

router.route('/').get((req, res) => {
    return res.render('reg.ejs');
});

//login
router.post('/', function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user) {
      // this will execute in any case, even if a passport strategy will find an error
      if (error || req.body.type != user.type || req.body.password != user.password) {
          return res.json({
              message: 'Invalid Username/Password!!',
              valid: false,
              id: null
          });
        }
        req.user = user;
        next();
    })(req, res);
  },

  // function to call once successfully authenticated
    function (req, res) {
        // console.log(req.user);
    return res.json({
        message: 'login success',
        valid:true,
        id:req.user._id
    });
    });

    // returns user details based on id
router.get('/user/:id', passport.checkAuthentication, async (req, res) => {
    try {
    
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.json({
                message: 'user not found'
            });
        }
        return res.json({
            message: 'user found!!',
            user
        });
    } catch (error) {
        return res.status(200).json({
            message: 'ERROR!!'
        });
    }

});

    
router.post('/changePassword/:id', passport.checkAuthentication, async(req, res) => {
 
    try {
        let user = await User.findById(req.params.id);
        user.password = req.body.password;
        return res.json({
            message: 'password updated successfully!!'
        })
    } catch (error) {
        return res.json({
            message: 'Error in Reseting password!!'
        })
    }
})

module.exports = router;