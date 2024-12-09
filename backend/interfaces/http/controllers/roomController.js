const RoomRepository = require('../../../infrastructure/repositories/RoomRepository');

const roomController = {
	async createRoom(req, res) {
		const roomRepository = new RoomRepository();

		try {
			const room = await roomRepository.create(req.body);
			res.status(201).json({ message: 'Room created successfully', room });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async getRoom(req, res) {
		const roomRepository = new RoomRepository();
		const { roomId } = req.body;

		try {
			const room = await roomRepository.findById(roomId);

			if (!room) {
				return res.status(404).json({ message: 'Room not found' });
			}

			res.status(200).json({ message: 'Room retrieved successfully', room });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async getAllRooms(req, res) {
		const roomRepository = new RoomRepository();

		try {
			const rooms = await roomRepository.fetchAll();
			res.status(200).json({ message: 'Rooms retrieved successfully', rooms });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async deleteRoom(req, res) {
		const roomRepository = new RoomRepository();
		const { roomId } = req.body;

		try {
			await roomRepository.delete(roomId);
			res.status(204).json({ message: 'Room deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = roomController;
