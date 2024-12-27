const MachineRepository = require('../../infrastructure/repositories/MachineRepository');
const Room = require('../../infrastructure/database/models/RoomModel');

const machineSockets = (io) => {
	const machineRepository = new MachineRepository();
	const onlineMachines = new Map();

	io.on('connection', (socket) => {
		console.log(`Machine client connected: ${socket.id}`);

		// When a machine comes online
		socket.on('machineOnline', async ({ machineId, userId }) => {
			try {
				if (!machineId || !userId) {
					socket.emit('error', {
						message: 'Machine ID and User ID are required',
					});
					return;
				}

				const machine = await machineRepository.getMachine(machineId);
				if (!machine) {
					socket.emit('error', { message: 'Machine not found' });
					return;
				}

				onlineMachines.set(machineId, {
					connectedAt: new Date(),
					socketId: socket.id,
					userId,
				});

				// Broadcast the updated status to all clients
				io.emit(
					'machineStatusUpdate',
					Array.from(onlineMachines.entries()).map(([id, data]) => ({
						machineId: id,
						connectedAt: data.connectedAt,
						uptime: `${Math.floor((new Date() - data.connectedAt) / 1000)}s`,
						userId: data.userId,
					}))
				);

				console.log(`Machine ${machineId} is online`);
			} catch (error) {
				console.error('Error handling machineOnline:', error);
				socket.emit('error', { message: error.message });
			}
		});

		// Start a machine
		socket.on('startMachine', async ({ machineId }) => {
			try {
				if (!machineId) {
					socket.emit('error', { message: 'Machine ID is required' });
					return;
				}

				const machine = await machineRepository.getMachine(machineId);
				if (!machine) {
					socket.emit('error', { message: 'Machine not found' });
					return;
				}

				machine.state = 'running';
				machine.connectedAt = new Date();
				console.log('Received startMachine event:', machineId);
				await machine.save();

				// Broadcast state change
				io.emit('machineStatusUpdate', {
					machineId,
					state: 'running',
				});

				console.log(`Machine ${machineId} started`);
			} catch (error) {
				console.error('Error starting machine:', error);
				socket.emit('error', { message: error.message });
			}
		});

		// Adjust a machine value

		socket.on('adjustMachineValue', async ({ machineId, value }) => {
			try {
				if (!machineId || value === undefined) {
					socket.emit('error', {
						message: 'Machine ID and value are required',
					});
					return;
				}

				const machine = await machineRepository.getMachine(machineId);
				if (!machine) {
					socket.emit('error', { message: 'Machine not found' });
					return;
				}

				machine.value = value;
				await machine.save();

				console.log(`Machine ${machineId} value adjusted to ${value}`);
			} catch (error) {
				console.error('Error adjusting machine value:', error);
				socket.emit('error', { message: error.message });
			}
		});

		// Stop a machine
		socket.on('stopMachine', async ({ machineId }) => {
			try {
				if (!machineId) {
					socket.emit('error', { message: 'Machine ID is required' });
					return;
				}

				const machine = await machineRepository.getMachine(machineId);
				if (!machine) {
					socket.emit('error', { message: 'Machine not found' });
					return;
				}

				machine.state = 'stopped';
				await machine.save();

				// Broadcast state change
				io.emit('machineStatusUpdate', {
					machineId,
					state: 'stopped',
				});

				console.log(`Machine ${machineId} stopped`);
			} catch (error) {
				console.error('Error stopping machine:', error);
				socket.emit('error', { message: error.message });
			}
		});

		// Handle disconnect
		socket.on('disconnect', () => {
			const machineId = [...onlineMachines].find(
				([id, data]) => data.socketId === socket.id
			)?.[0];

			if (machineId) {
				onlineMachines.delete(machineId);

				io.emit(
					'machineStatusUpdate',
					Array.from(onlineMachines.entries()).map(([id, data]) => ({
						machineId: id,
						connectedAt: data.connectedAt,
						uptime: `${Math.floor((new Date() - data.connectedAt) / 1000)}s`,
						userId: data.userId,
					}))
				);

				console.log(`Machine ${machineId} is offline`);
			}
		});
	});
};

module.exports = machineSockets;
