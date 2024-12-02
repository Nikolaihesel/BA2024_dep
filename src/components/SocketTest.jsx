import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketTest = () => {
	const [socket, setSocket] = useState(null);
	const [serverMessages, setServerMessages] = useState([]);

	useEffect(() => {
		const newSocket = io('http://localhost:3000');
		setSocket(newSocket);

		newSocket.on('connect', () => {
			console.log('Connected to server:', newSocket.id);
		});

		newSocket.on('example-response', (data) => {
			console.log('Response from server:', data);

			setServerMessages((prevMessages) => [...prevMessages, data.message]);
		});

		newSocket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const handleButtonClick = () => {
		if (socket) {
			socket.emit('example-event', { message: 'Button clicked from React!' });
		}
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			<h1>Socket.IO React Client</h1>
			<button
				onClick={handleButtonClick}
				style={{ padding: '10px 20px', cursor: 'pointer' }}>
				Send Message to Server
			</button>

			<h2>Server Responses:</h2>
			<ul>
				{serverMessages.map((msg, index) => (
					<li key={index}>{msg}</li>
				))}
			</ul>
		</div>
	);
};

export default SocketTest;
