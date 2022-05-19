const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
router.post('/login', usersController.loginUser);
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;
