const machineSockets = require('../../interfaces/http/sockets/machineSockets');

const socketHandlers = (io) => {
	machineSockets(io);
};

module.exports = socketHandlers;
