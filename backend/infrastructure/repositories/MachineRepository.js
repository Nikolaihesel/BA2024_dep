const Machine = require('../database/models/MachineModel');
const Room = require('../database/models/RoomModel');

class MachineRepository {
	constructor() {
		this.machines = {};
	}
	async createMachine(data) {
		return await Machine.create(data);
	}

	async addMachine({ name, roomId, socket }) {
		const machine = await Machine.create({
			name,
			room: roomId,
			state: 'stopped',
			value: 0,
		});

		await Room.findByIdAndUpdate(
			roomId,
			{ $push: { machines: machine._id } },
			{ new: true }
		);

		if (socket) {
			this.machines[machine._id] = { socket, ...machine.toObject() };
		}

		return machine;
	}

	async getMachine(id) {
		const machine = await Machine.findById(id).populate('room');
		if (!machine) {
			throw new Error(`Machine with id ${id} not found`);
		}

		return machine;
	}

	async listMachines(filter = {}) {
		return await Machine.find(filter).populate('room');
	}

	async removeMachine(id) {
		if (this.machines[id]) {
			delete this.machines[id];
		}

		const result = await Machine.findByIdAndDelete(id);
		if (!result) {
			throw new Error(`Machine with id ${id} not found`);
		}
	}
}

module.exports = MachineRepository;
