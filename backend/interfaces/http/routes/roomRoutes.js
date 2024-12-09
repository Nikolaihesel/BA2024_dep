const express = require('express');
const roomController = require('../../http/controllers/roomController');
const authMiddleware = require('../../../infrastructure/middleware/authMiddleware');
const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.post('/get-room', roomController.getRoom);
router.delete('/delete-room', roomController.deleteRoom);

module.exports = router;
