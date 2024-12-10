const express = require('express');
const roomController = require('../../http/controllers/roomController');
const authMiddleware = require('../../../infrastructure/middleware/authMiddleware');
const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.post('/get-room', roomController.getRoom);
router.delete('/delete-room', roomController.deleteRoom);
router.post('/get-room-with-machines', roomController.getRoomWithMachines);
router.get(
	'/get-all-rooms-with-machines',
	roomController.getAllRoomsWithMachines
);

module.exports = router;
