const Room = require('../database/models/RoomModel');
const Machine = require('../database/models/MachineModel.js');

class RoomRepository {
	async create(roomData) {
		const room = new Room(roomData);
		return await room.save();
	}

	async findById(id) {
		return await Room.findById(id);
	}
	async findRoomByIdWithMachines(roomId) {
		return await Room.findById(roomId).populate('machines');
	}

	async findAllRoomsWithMachines() {
		return await Room.find().populate('machines');
	}

	async fetchAll() {
		return await Room.find();
	}

	async update(id, data) {
		return await Room.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id) {
		return await Room.findByIdAndDelete(id);
	}
	async addMachineToRoom(roomId, machineId) {
		return await Room.findByIdAndUpdate(
			roomId,
			{ $push: { machines: machineId } },
			{ new: true }
		);
	}
}

module.exports = RoomRepository;
