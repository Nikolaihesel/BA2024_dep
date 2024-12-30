const express = require('express');
const departmentController = require('../../http/controllers/departmentController');
const router = express.Router();

router.post('/register', departmentController.register);
router.post('/addUser', departmentController.addUser);
router.post('/addRoom', departmentController.addRoom);
router.get('/', departmentController.fetchAll);

module.exports = router;
