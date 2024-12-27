class AddRoomToDepartmentUseCase {
	constructor({ departmentRepository, roomRepository }) {
		this.departmentRepository = departmentRepository;
		this.roomRepository = roomRepository;
	}

	async execute(departmentId, roomId) {
		const department = await this.departmentRepository.getById(departmentId);
		if (!department) {
			throw new Error(`Department with ID ${departmentId} not found.`);
		}

		const room = await this.roomRepository.getById(roomId);
		if (!room) {
			throw new Error(`Room with ID ${roomId} not found.`);
		}

		const wasAdded = department.addRoom(room);
		if (!wasAdded) {
			throw new Error(
				`Room ${roomId} is already associated with Department ${departmentId}.`
			);
		}

		await this.departmentRepository.save(department);
		return department;
	}
}

module.exports = AddRoomToDepartmentUseCase;
