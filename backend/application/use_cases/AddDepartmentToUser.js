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

		const wasAdded = await this.departmentRepository.addUser(
			departmentId,
			userId
		);
		if (!wasAdded) {
			throw new Error(
				`User ${userId} is already a member of department ${departmentId}.`
			);
		}
	}
}

module.exports = AddUserToDepartment;
