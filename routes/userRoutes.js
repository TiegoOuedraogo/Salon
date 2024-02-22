const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

//regist
router.post('/register',user.register);

//login
router.post('/login', user.login);

module.exports = router;
