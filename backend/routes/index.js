const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/create-student', require('./createStudents'));

router.route('/').get((req, res) => {
    return res.json({
        message: "welcome to backend Student Registration"
    });
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
  
module.exports = router;