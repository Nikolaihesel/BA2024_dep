class AddRoomToDepartment {
	constructor({ departmentRepository, roomRepository }) {
		this.departmentRepository = departmentRepository;
		this.roomRepository = roomRepository;
	}

	async execute(departmentId, roomId) {
		const room = await this.roomRepository.findById(roomId);
		if (!room) {
			throw new Error(`Room with ID ${roomId} not found.`);
		}

		const department = await this.departmentRepository.findById(departmentId);
		if (!department) {
			throw new Error(`Department with ID ${departmentId} not found.`);
		}

		const wasAddedToDepartment = await this.departmentRepository.addRoom(
			departmentId,
			roomId
		);
		if (!wasAddedToDepartment) {
			throw new Error(
				`Room ${roomId} is already associated with department ${departmentId}.`
			);
		}

		return {
			success: true,
			message: `Room ${roomId} successfully added to department ${departmentId}.`,
		};
	}
}

module.exports = AddRoomToDepartment;
