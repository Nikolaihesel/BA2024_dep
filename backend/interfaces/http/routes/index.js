const express = require('express');
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const machineRoutes = require('./machineRoutes');
const departmentRoutes = require('./departmentRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/machines', machineRoutes);
router.use('/departments', departmentRoutes);

module.exports = router;
