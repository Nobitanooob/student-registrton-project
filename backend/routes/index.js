const express = require('express');
const { route } = require('./createStudents');
const router = express.Router();

router.use('/create-student', require('./createStudents'));
router.route('/').get((req, res) => {
    return res.json({
        message: "welcome to backend Student Registration"
    });
});

router.route('/').post((req, res) => {
    console.log(req.body);
     res.json(req.body);
})

module.exports = router;