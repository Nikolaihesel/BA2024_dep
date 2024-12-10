const RoomRepository = require('../../../infrastructure/repositories/RoomRepository');
const MachineRepository = require('../../../infrastructure/repositories/MachineRepository');

const machineController = {
	async addMachine(req, res) {
		const machineRepository = new MachineRepository();
		const roomRepository = new RoomRepository();

		try {
			const { name, roomId } = req.body;

			const machine = await machineRepository.createMachine({
				name,
				room: roomId,
				state: 'stopped',
				value: 0,
			});

			await roomRepository.addMachineToRoom(roomId, machine._id);

			res.status(201).json({ message: 'Machine added successfully', machine });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async stopMachine(req, res) {
		const machineRepository = new MachineRepository();

		try {
			const { id } = req.body;

			const machine = await machineRepository.getMachine(id);
			machine.state = 'stopped';
			await machine.save();

			res.status(200).json({ message: `Machine ${id} stopped successfully` });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async adjustMachineValue(req, res) {
		const machineRepository = new MachineRepository();

		try {
			const { id, value } = req.body;

			const machine = await machineRepository.getMachine(id);
			machine.value = value;
			await machine.save();

			res
				.status(200)
				.json({ message: `Machine ${id} value adjusted to ${value}` });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async startMachine(req, res) {
		const machineRepository = new MachineRepository();

		try {
			const { id } = req.body;

			const machine = await machineRepository.getMachine(id);
			if (!machine) {
				return res.status(404).json({ message: 'Machine not found' });
			}

			machine.state = 'running';
			machine.connectedAt = new Date();
			await machine.save();

			res
				.status(200)
				.json({ message: `Machine ${id} started successfully`, machine });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
	async listRunningMachines(req, res) {
		const machineRepository = new MachineRepository();

		try {
			const runningMachines = await machineRepository.listMachines({
				state: 'running',
			});
			const machinesWithUptime = runningMachines.map((machine) => {
				const uptime = machine.connectedAt
					? `${Math.floor(
							(Date.now() - new Date(machine.connectedAt)) / 1000
					  )}s`
					: 'N/A';
				return { ...machine.toObject(), uptime };
			});

			res.status(200).json({ machines: machinesWithUptime });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async listMachines(req, res) {
		const machineRepository = new MachineRepository();

		try {
			const machines = await machineRepository.listMachines();
			res
				.status(200)
				.json({ message: 'Machines retrieved successfully', machines });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = machineController;
