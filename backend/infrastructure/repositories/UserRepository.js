const User = require('../database/models/UserModel');

class UserRepository {
	async create(userData) {
		const user = new User(userData);
		return await user.save();
	}
	async fetchAll() {
		return await User.find().select('-password');
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

	async updateUser(userId, userData) {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error(`User with ID ${userId} not found.`);
		}

		Object.assign(user, userData);

		await user.save();
		return user;
	}

	async findUserDepartments(userId) {
		const user = await this.findById(userId);
		if (!user) {
			throw new Error(`User with ID ${userId} not found.`);
		}

		return await User.findById(userId).populate('departments');
	}

	async addDepartment(userId, departmentId) {
		const user = await this.findById(userId);
		if (!user) {
			throw new Error(`User with ID ${userId} not found.`);
		}

		if (user.departments.some((dept) => dept.toString() === departmentId)) {
			return false;
		}

		user.departments.push(departmentId);
		await user.save();
		return true;
	}
}

module.exports = UserRepository;
