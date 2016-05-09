var express = require('express');
var router = express.Router();

router.use('/users', require('./user'));
router.use('/posts', require('./posts'));


module.exports = router;
