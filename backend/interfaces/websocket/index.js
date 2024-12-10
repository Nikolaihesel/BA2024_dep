const machineSockets = require('../../interfaces/http/sockets/machineSockets');

const socketHandlers = (io) => {
	machineSockets(io); // Add machine socket handlers
	// Add other socket handlers here if needed (e.g., for rooms, users, etc.)
};

module.exports = socketHandlers;
