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

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Invalid username or password');
		}

		return { id: user._id, username: user.username };
	}
}

module.exports = LoginUser;
