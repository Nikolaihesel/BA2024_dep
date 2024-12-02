const UserRepository = require('../../../infrastructure/repositories/UserRepository');
const CreateUser = require('../../../application/use_cases/CreateUser');
const LogInUser = require('../../../application/use_cases/LogInUser');
const JwtService = require('../../../infrastructure/services/jwtService');
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
		const loginUser = new LogInUser(userRepository);
		const jwtService = new JwtService(process.env.JWT_SECRET);

		try {
			const user = await loginUser.execute(req.body);

			const token = jwtService.generateToken({
				id: user.id,
				username: user.username,
			});

			res.status(200).json({ message: 'Login successful', token, user });
		} catch (error) {
			res.status(401).json({ message: error.message });
		}
	},

	async profile(req, res) {
		try {
			res.status(200).json({ message: 'Profile retrieved', user: req.user });
		} catch (error) {
			res.status(500).json({ message: 'Error retrieving profile' });
		}
	},
};

module.exports = userController;
