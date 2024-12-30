const Department = require('../database/models/DepartmentModel');

class DepartmentRepository {
	async create(departmentData) {
		const department = new Department(departmentData);
		return await department.save();
	}

	async fetchAll() {
		return await Department.find();
	}

	async findByDepartmentName(departmentName) {
		return await Department.findOne({ departmentName });
	}

	async findById(departmentId) {
		return await Department.findById(departmentId);
	}

	async addUser(departmentId, userId) {
		const department = await this.findById(departmentId);
		if (!department) {
			throw new Error(`Department with ID ${departmentId} not found.`);
		}

		if (
			department.users.some((existingUserId) => existingUserId.equals(userId))
		) {
			return false;
		}

		department.users.push(userId);

		await department.save();
		return true;
	}

	async addRoom(departmentId, roomId) {
		const department = await this.findById(departmentId);
		if (!department) {
			throw new Error(`Department with ID ${departmentId} not found.`);
		}

		if (
			department.rooms &&
			department.rooms.some((existingRoomId) => existingRoomId.equals(roomId))
		) {
			return false;
		}

		if (!department.rooms) {
			department.rooms = [];
		}

		department.rooms.push(roomId);

		await department.save();
		return true;
	}

	async addMachine(departmentId, machineId) {
		return await Department.findByIdAndUpdate(
			departmentId,
			{ $addToSet: { machines: machineId } },
			{ new: true }
		).populate('machines');
	}

	async deleteById(departmentId) {
		return await Department.findByIdAndDelete(departmentId);
	}
}

module.exports = DepartmentRepository;
