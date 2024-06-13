const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');

const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');
const messageController = require('../controllers/MessageController');

const { validateRegister, validateLogin } = require('../validators/auth');
const { validateUser } = require('../validators/user');

//define route for register
router.post('/register', validateRegister, registerController.register);
router.post('/login', validateLogin, loginController.login);
router.get('/users', userController.findUsers);
router.get('/users/:userName', verifyToken, userController.findUserByUsername);
router.put('/users/:userName', verifyToken, userController.updateUser);
router.get('/message/:sender&:receiver', verifyToken, messageController.fetchMessage);
router.post('/message/:sender&:receiver', verifyToken, messageController.sendMessage);
router.put('/message/:id', verifyToken, messageController.updateMessage);

//export router
module.exports = router