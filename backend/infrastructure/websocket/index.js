module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('Client connected:', socket.id);

		socket.on('example-event', (data) => {
			console.log('Received example-event from:', socket.id, data);

			io.emit('example-response', { message: `Broadcast: ${data.message}` });
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected:', socket.id);
		});
	});
};
