const MachineRepository = require('../../infrastructure/repositories/MachineRepository');
const Room = require('../../infrastructure/database/models/RoomModel');

const machineSockets = (io) => {
	const machineRepository = new MachineRepository();
	const onlineMachines = new Map();

	io.on('connection', (socket) => {
		console.log(`Machine client connected: ${socket.id}`);

		socket.on('machineOnline', async ({ machineId, userId }) => {
			try {
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
