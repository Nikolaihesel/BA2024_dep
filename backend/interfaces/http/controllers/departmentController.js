const DepartmentRepository = require('../../../infrastructure/repositories/DepartmentRepository');
const UserRepository = require('../../../infrastructure/repositories/UserRepository');
const RoomRepository = require('../../../infrastructure/repositories/RoomRepository');
const CreateDepartment = require('../../../application/use_cases/CreateDepartment');
const AddUserToDepartment = require('../../../application/use_cases/AddUserToDepartment');
const AddRoomToDepartment = require('../../../application/use_cases/AddRoomToDepartment');

const departmentController = {
	async register(req, res) {
		const departmentRepository = new DepartmentRepository();
		const createDepartment = new CreateDepartment(departmentRepository);

		try {
			if (!req.body) {
				return res.status(400).json({ message: 'Department name is required' });
			}

			const department = await createDepartment.execute(req.body);

			res
				.status(201)
				.json({ message: 'Department registered successfully', department });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async addUser(req, res) {
		const departmentRepository = new DepartmentRepository();
		const userRepository = new UserRepository();
		const addUserToDepartment = new AddUserToDepartment({
			departmentRepository,
			userRepository,
		});

		try {
			const { departmentId, userId } = req.body;

			if (!departmentId || !userId) {
				return res
					.status(400)
					.json({ message: 'Both departmentId and userId are required' });
			}

			await addUserToDepartment.execute(userId, departmentId);

			res
				.status(200)
				.json({ message: 'User added to department successfully' });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async addRoom(req, res) {
		const departmentRepository = new DepartmentRepository();
		const roomRepository = new RoomRepository();
		const addRoomToDepartment = new AddRoomToDepartment({
			departmentRepository,
			roomRepository,
		});

		try {
			const { departmentId, roomId } = req.body;
			if (!departmentId || !roomId) {
				return res
					.status(400)
					.json({ message: 'Both departmentId and roomId are required' });
			}

			await addRoomToDepartment.execute(departmentId, roomId);

			res
				.status(200)
				.json({ message: 'Room added to department successfully' });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async fetchAll(req, res) {
		const departmentRepository = new DepartmentRepository();

		try {
			const departments = await departmentRepository.fetchAllWithRooms();

			res.status(200).json({ departments });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
};

module.exports = departmentController;
