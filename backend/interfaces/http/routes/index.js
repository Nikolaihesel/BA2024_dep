const express = require('express');
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;
