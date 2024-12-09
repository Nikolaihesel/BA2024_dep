class AddMachineToRoomUseCase {
	constructor(roomRepository, machineRepository) {
		this.roomRepository = roomRepository;
		this.machineRepository = machineRepository;
	}

	async execute(roomId, machineId) {
		const room = await this.roomRepository.findById(roomId);
		const machine = await this.machineRepository.findById(machineId);

		if (!room || !machine) throw new Error('Room or Machine not found');

		room.machines.push(machine._id);
		return await this.roomRepository.update(roomId, {
			machines: room.machines,
		});
	}
}

module.exports = AddMachineToRoomUseCase;
