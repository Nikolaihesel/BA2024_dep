import React, { useState, useEffect } from 'react';
import style from './portalInfo.module.scss';
import MachineTimer from '../machineTimer/MachineTimer';
import ContactPortal from '../contactPortal/ContactPortal';
import io from 'socket.io-client';

const PortalInfoSheet = () => {
	const [machines, setMachines] = useState([]);

	const calculateUptime = (connectedAt) => {
		const now = new Date();
		const connectedTime = new Date(connectedAt);
		const diff = Math.abs(now - connectedTime);

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		let uptime = '';
		if (days > 0) uptime += `${days}d `;
		if (hours > 0 || days > 0) uptime += `${hours}h `;
		uptime += `${minutes}m ${seconds}s`;

		return uptime.trim();
	};

	useEffect(() => {
		const fetchRunningMachines = async () => {
			try {
				const response = await fetch(
					'https://ba2024.onrender.com/api/machines/running',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				const data = await response.json();

				const updatedMachines = data.machines.map((machine) => ({
					...machine,
					uptime: calculateUptime(machine.connectedAt),
				}));

				setMachines(updatedMachines);
			} catch (error) {
				console.error('Error fetching running machines:', error);
			}
		};

		fetchRunningMachines();

		const socket = io('http://localhost:3000');

		socket.on('machineStatusUpdate', (updatedMachines) => {
			const recalculatedMachines = updatedMachines.map((machine) => ({
				...machine,
				uptime: calculateUptime(machine.connectedAt),
			}));

			setMachines(recalculatedMachines);
		});

		const interval = setInterval(() => {
			setMachines((prevMachines) =>
				prevMachines.map((machine) => ({
					...machine,
					uptime: calculateUptime(machine.connectedAt),
				}))
			);
		}, 1000);

		return () => {
			socket.disconnect();
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={style.portalInfo}>
			<p className={style.portalInfoHeader}>Live Machines: {machines.length}</p>
			<div className={style.timerContainer}>
				{machines.length > 0 ? (
					machines.map((machine) => (
						<MachineTimer
							key={machine._id}
							Name={machine.name}
							Uptime={machine.uptime}
						/>
					))
				) : (
					<p>There are no active machines at this time</p>
				)}
			</div>
			<div className={style.contactContainer}>
				<ContactPortal />
			</div>
		</div>
	);
};

export default PortalInfoSheet;
