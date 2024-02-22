const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); 

// Register a new user
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get all users (Consider protecting this route)
router.get('/', userController.getAllUser);

// Get a single user by ID (Consider protecting this route)
router.get('/:id', userController.getUserById);

// Update a user by ID (Consider adding authentication/authorization middleware)
router.put('/:id', userController.updateUserById);

// Delete a user by ID (Consider adding authentication/authorization middleware)
router.delete('/:id', userController.deleteUserById);

module.exports = router;
