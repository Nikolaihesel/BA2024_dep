const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../../../infrastructure/middleware//authMiddleware.js');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);

module.exports = router;
