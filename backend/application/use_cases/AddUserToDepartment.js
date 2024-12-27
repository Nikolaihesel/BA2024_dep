class AddUserToDepartment {
	constructor({ userRepository, departmentRepository }) {
		this.userRepository = userRepository;
		this.departmentRepository = departmentRepository;
	}

	async execute(userId, departmentId) {
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new Error(`User with ID ${userId} not found.`);
		}

		const department = await this.departmentRepository.findById(departmentId);
		if (!department) {
			throw new Error(`Department with ID ${departmentId} not found.`);
		}

		const wasAddedToDepartment = await this.departmentRepository.addUser(
			departmentId,
			userId
		);
		if (!wasAddedToDepartment) {
			throw new Error(
				`User ${userId} is already a member of department ${departmentId}.`
			);
		}

		const wasAddedToUser = await this.userRepository.addDepartment(
			userId,
			departmentId
		);
		if (!wasAddedToUser) {
			throw new Error(
				`Department ${departmentId} is already associated with user ${userId}.`
			);
		}
	}
}

module.exports = AddUserToDepartment;
