const UserRepository = require('../../../infrastructure/repositories/UserRepository');
const CreateUser = require('../../../application/use_cases/CreateUser');
const LogInUser = require('../../../application/use_cases/LogInUser');

const userController = {
	async register(req, res) {
		const userRepository = new UserRepository();
		const createUser = new CreateUser(userRepository);

		try {
			const user = await createUser.execute(req.body);
			res.status(201).json({ message: 'User registered successfully', user });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async login(req, res) {
		const userRepository = new UserRepository();
		const logInUser = new LogInUser(userRepository);

		try {
			const user = await logInUser.execute(req.body);
			res.status(200).json({ message: 'Login successful', user });
		} catch (error) {
			res.status(401).json({ message: error.message });
		}
	},
};

module.exports = userController;
