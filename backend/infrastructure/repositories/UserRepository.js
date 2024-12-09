const User = require('../database/models/UserModel');

class UserRepository {
	async create(userData) {
		const user = new User(userData);
		return await user.save();
	}
	async fetchAll() {
		return await User.find().select('-password');
	}

	async findByDepartment(department) {
		return await User.findOne({ department });
	}
	async findByRole(role) {
		return await User.find({ role });
	}

	async findByUsername(username) {
		return await User.findOne({ username });
	}

	async findById(id) {
		return await User.findById(id);
	}
}

module.exports = UserRepository;
