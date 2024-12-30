import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import style from './machineControls.module.scss';
import { io } from 'socket.io-client';

const socket = io('https://ba2024.onrender.com');

const MachineControls = () => {
	const { rooms } = useOutletContext();
	const location = useLocation();
	const navigate = useNavigate();
	const roomId = location.state?.roomId;
	const [selectedMachine, setSelectedMachine] = useState(null);
	const [localRooms, setLocalRooms] = useState(rooms);
	const [adjustValue, setAdjustValue] = useState(
		selectedMachine ? selectedMachine.value : ''
	);

	const room = localRooms.find((r) => r._id === roomId);

	useEffect(() => {
		if (selectedMachine) {
			setAdjustValue(selectedMachine.value || 0);
		}
	}, [selectedMachine]);

	useEffect(() => {
		socket.on('machineStatusUpdate', (update) => {
			setLocalRooms((prevRooms) =>
				prevRooms.map((r) =>
					r._id === roomId
						? {
								...r,
								machines: r.machines.map((machine) =>
									machine._id === update.machineId
										? { ...machine, state: update.state }
										: machine
								),
						  }
						: r
				)
			);
		});

		return () => {
			socket.off('machineStatusUpdate');
		};
	}, [roomId]);

	const handleStart = (e) => {
		if (selectedMachine) {
			socket.emit('startMachine', { machineId: selectedMachine._id });
			setAdjustValue(e.target.value);
		}
	};

	const handleStop = () => {
		if (selectedMachine) {
			socket.emit('stopMachine', { machineId: selectedMachine._id });
		}
	};

	const handleValueChange = (e) => {
		const newValue = e.target.value;
		setAdjustValue(newValue);
		if (selectedMachine) {
			socket.emit('adjustMachineValue', {
				machineId: selectedMachine._id,
				value: newValue,
			});
		}
	};

	if (!room) {
		return (
			<div>
				<p>Room not found. Please go back.</p>
				<button onClick={() => navigate(-1)}>Go Back</button>
			</div>
		);
	}

	return (
		<div style={{ height: '80%' }}>
			<h1 className={style.roomHeader}>{room.name}</h1>
			<hr className={style.seperator} />
			<div className={style.machineButtonContainer}>
				{room.machines.map((machine) => (
					<button
						className={
							machine._id === selectedMachine?._id
								? style.machineButtonSelected
								: machine.state === 'running'
								? style.machineButtonActive
								: style.machineButton
						}
						key={machine._id}
						onClick={() => setSelectedMachine(machine)}>
						{machine.name}
					</button>
				))}
			</div>
			{selectedMachine && (
				<>
					{' '}
					<h2>Control Panel for {selectedMachine.name}</h2>
					<div className={style.machineControlContainer}>
						<div className={style.buttonContainerControl}>
							<button onClick={handleStart}>Start</button>
							<button onClick={handleStop}>Stop</button>
						</div>
						<div className={style.rangeWrapper}>
							<input
								className={style.rangeInput}
								type='range'
								min={0}
								max={100}
								placeholder='Adjust Value'
								value={adjustValue}
								onChange={handleValueChange}
							/>
							<p>{adjustValue}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MachineControls;
