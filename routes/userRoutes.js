const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

//regist
router.post('/register',user.register);

//login
router.post('/login', user.login);

router.get('/', user.getAllUser);

router.get('/:id', user.getUserById);

router.put('/:id', user.updateUserById);

router.delete('/:id', user.deleteUserById)


module.exports = router;

