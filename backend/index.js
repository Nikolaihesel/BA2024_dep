const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./infrastructure/database/mongoose');
const socketHandlers = require('./infrastructure/websocket/index');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

app.use(cors());

connectDB();

app.use(express.json());

const routes = require('./interfaces/http/routes');

app.use('/api', routes);

socketHandlers(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
