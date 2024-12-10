import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const TestMachine = () => {
	const [socket, setSocket] = useState(null);
	const [machineName, setMachineName] = useState('');
	const [availableRooms, setAvailableRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState('');
	const [machines, setMachines] = useState([]);
	const [adjustValue, setAdjustValue] = useState(0);

	useEffect(() => {
		const newSocket = io('http://localhost:3000');
		setSocket(newSocket);

		newSocket.on('connect', () => {
			console.log('Connected to WebSocket server:', newSocket.id);
		});

		newSocket.on('machineAdded', (data) => {
			console.log('Machine Added:', data);
			setMachines((prev) => [...prev, data.machine]);
		});

		newSocket.on('machineStarted', (data) => {
			console.log('Machine Started:', data.message);
		});

		newSocket.on('machineStopped', (data) => {
			console.log('Machine Stopped:', data.message);
		});

		newSocket.on('machineAdjusted', (data) => {
			console.log('Machine Adjusted:', data.message);
		});

		newSocket.on('error', (data) => {
			console.error('Error:', data.message);
		});

		newSocket.on('disconnect', () => {
			console.log('Disconnected from WebSocket server');
		});

		fetch('http://localhost:3000/api/rooms')
			.then((response) => response.json())
			.then((data) => {
				setAvailableRooms(data.rooms);

				if (data.rooms.length > 0) {
					setSelectedRoom(data.rooms[0]._id);
				}
			})
			.catch((err) => console.error('Failed to fetch rooms:', err));

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const handleAddMachine = () => {
		if (!selectedRoom) {
			alert('Please select a room!');
			return;
		}

		socket.emit('addMachine', { name: machineName, roomId: selectedRoom });
		setMachineName('');
	};

	const handleStartMachine = (id) => {
		socket.emit('startMachine', { id });
	};

	const handleStopMachine = (id) => {
		socket.emit('stopMachine', { id });
	};

	const handleAdjustMachine = (id) => {
		socket.emit('adjustMachine', { id, value: adjustValue });
		setAdjustValue(0);
	};

	return (
		<div>
			<h1>Test Machine</h1>

			<div>
				<h3>Select Room</h3>
				<select
					value={selectedRoom}
					onChange={(e) => setSelectedRoom(e.target.value)}>
					{availableRooms.map((room) => (
						<option
							key={room._id}
							value={room._id}>
							{room.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<h3>Add Machine</h3>
				<input
					type='text'
					placeholder='Machine Name'
					value={machineName}
					onChange={(e) => setMachineName(e.target.value)}
				/>
				<button onClick={handleAddMachine}>Add Machine</button>
			</div>

			<div>
				<h3>Machines in Selected Room</h3>
				<ul>
					{machines
						.filter((machine) => machine.roomId === selectedRoom)
						.map((machine) => (
							<li key={machine._id}>
								{machine.name} - {machine.state} - Value: {machine.value}{' '}
								<button onClick={() => handleStartMachine(machine._id)}>
									Start
								</button>
								<button onClick={() => handleStopMachine(machine._id)}>
									Stop
								</button>
								<input
									type='number'
									placeholder='Adjust Value'
									value={adjustValue}
									onChange={(e) => setAdjustValue(Number(e.target.value))}
								/>
								<button onClick={() => handleAdjustMachine(machine._id)}>
									Adjust
								</button>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default TestMachine;
