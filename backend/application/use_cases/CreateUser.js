const bcrypt = require('bcrypt');

class CreateUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userData) {
		const existingUser = await this.userRepository.findByDepartment(
			userData.department
		);
		if (existingUser) {
			throw new Error('department already exist');
		}

		const existingUsername = await this.userRepository.findByUsername(
			userData.username
		);
		if (existingUsername) {
			throw new Error('Username already taken');
		}

		userData.password = await this.hashPassword(userData.password);

		return await this.userRepository.create(userData);
	}

	async hashPassword(password) {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	}
}

module.exports = CreateUser;
