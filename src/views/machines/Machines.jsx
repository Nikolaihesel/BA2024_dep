import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './machines.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';

import PortalInfoSheet from '../../components/portalInfoSheet/PortalInfoSheet.jsx';

const Machines = () => {
	const navigate = useNavigate();
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(true);

	const getRoomsWithMachines = async () => {
		try {
			const response = await fetch(
				'http://localhost:3000/api/rooms/get-all-rooms-with-machines',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(data);
			setRooms(data.rooms);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching rooms with machines:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getRoomsWithMachines();
	}, []);

	return (
		<div className={style.rowWrapper}>
			<div className={style.portalWrapper}>
				<div className={style.menuHeaderWrapper}>
					<p className={style.menuHeader}>
						User
						<select className={style.thinFont}>
							<option value='Afd Lyd'> Afd. Lyd </option>
							<option value='Afd D'> Afd. D </option>
							<option value='Afd S'> Afd. S </option>
						</select>
					</p>

					<div className={style.iconWrapper}>
						<FontAwesomeIcon icon={faUser} />
						<p>Change user</p>
					</div>
				</div>
				<hr />

				<div className={style.unitWrapper}>
					{loading ? (
						<p>Loading...</p>
					) : rooms.length > 0 ? (
						rooms.map((room, index) => (
							<div
								className={style.unit}
								key={room._id || index}>
								<div
									className={style.unitTitle}
									onClick={() => navigate('/machine')}>
									<p>
										{room.name} <FontAwesomeIcon icon={faArrowRight} />
									</p>
								</div>

								{room.machines && room.machines.length > 0 ? (
									room.machines.map((machine) => (
										<button
											className={
												machine.state === 'running'
													? `${style.selectButtonActive} running`
													: style.selectButton
											}
											key={machine._id}>
											{machine.name}
										</button>
									))
								) : (
									<p>No machines in this room</p>
								)}
							</div>
						))
					) : (
						<p>No rooms available</p>
					)}
				</div>
			</div>
			<PortalInfoSheet />
		</div>
	);
};

export default Machines;
