const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();


router.get('/:user', userController.getUserById);
router.post('/', userController.addUser);
router.post('/login', userController.login);
router.post('/logout/', (req, res) => {
    req.session.destroy();
    let response = {
        admin: null,
        usuario: '',
        success: true
    }
    res.send(response);
  });

module.exports = router;