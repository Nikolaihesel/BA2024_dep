const bcrypt = require('bcrypt');

class LoginUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(credentials) {
		const { username, password } = credentials;

		const user = await this.userRepository.findByUsername(username);
		if (!user) {
			throw new Error('Invalid username or password');
		}

		const userRole = await this.userRepository.findByRole(user.role);
		if (!userRole) {
			throw new Error('no role assigned');
		}

		const userWithDepartments = await this.userRepository.findUserDepartments(
			user._id
		);
		if (
			!userWithDepartments.departments ||
			userWithDepartments.departments.length === 0
		) {
			throw new Error('No department assigned');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Invalid username or password');
		}

		return {
			id: user._id,
			username: user.username,
			role: user.role,
			departments: userWithDepartments.departments,
		};
	}
}

module.exports = LoginUser;
