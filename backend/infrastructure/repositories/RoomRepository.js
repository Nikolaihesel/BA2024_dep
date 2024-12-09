const Room = require('../database/models/RoomModel');

class RoomRepository {
	async create(roomData) {
		const room = new Room(roomData);
		return await room.save();
	}

	async findById(id) {
		return await Room.findById(id);
	}

	async fetchAll() {
		return await Room.find();
	}

	// Update a room by ID
	async update(id, data) {
		return await Room.findByIdAndUpdate(id, data, { new: true });
	}

	// Delete a room by ID
	async delete(id) {
		return await Room.findByIdAndDelete(id);
	}
}

module.exports = RoomRepository;
