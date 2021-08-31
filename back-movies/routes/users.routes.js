const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();


router.get('/:user', userController.getUserById);
router.post('/', userController.addUser);
router.post('/login', userController.login);
router.post('/username', userController.validateUser);
module.exports = router;