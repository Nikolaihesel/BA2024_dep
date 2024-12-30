import React, { useState, useEffect } from 'react';
import style from './viewStyles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import InitialIcon from '../components/initialIcon/InitialIcon';
import PortalInfoSheet from '../components/portalInfoSheet/PortalInfoSheet';
import MachineAccesInfo from '../components/machineAcces/MachineAccesInfo';
import useAuthStore from '../stores/AuthStore';

const Portal = () => {
	const { user } = useAuthStore();
	const [room, setRoom] = useState([]);

	const getRooms = async () => {
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
			setRoom(data.rooms);
		} catch (error) {
			console.error('Error fetching rooms:', error);
		}
	};

	useEffect(() => {
		getRooms();
	}, []);

	return (
		<div className={style.rowWrapper}>
			<div className={style.portalWrapper}>
				<div className={style.menuHeaderWrapper}>
					<p className={style.menuHeader}>
						Current User <span className={style.thinFont}>{user.username}</span>
					</p>
					{user.role === 'admin' && (
						<div className={style.iconWrapper}>
							<FontAwesomeIcon icon={faUser} />
							<p>Edit user</p>
						</div>
					)}
				</div>
				<hr />
				<div className={style.userInfoWrapper}>
					<InitialIcon Initial={user.username[0]} />
					<p className={style.menuHeader}>
						Username: <span className={style.thinFont}>{user.username}</span>
					</p>
					<p className={style.menuHeader}>
						Role: <span className={style.thinFont}>{user.role}</span>
					</p>
				</div>

				<div className={style.userAccessWrapper}>
					<div className={style.menuHeaderWrapper}>
						<p className={style.menuHeader}>User Access Rights</p>

						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: '.5em',
							}}>
							<p className={style.menuHeader}>Department</p>
							<select
								name='department'
								id='department'>
								<option value='  '>Vælg afdeling</option>
								{user.departments &&
									user.departments.map((department) => (
										<option
											key={department._id}
											value={department._id}>
											{department.departmentName}
										</option>
									))}
							</select>
						</div>
						{user.role === 'admin' && (
							<div className={style.iconWrapper}>
								<FontAwesomeIcon icon={faUser} />
								<p>Edit Rights</p>
							</div>
						)}
					</div>

					<hr />
					<div className={style.machineAccessInfo}>
						{room &&
							room.length > 0 &&
							room.map((room, index) => (
								<MachineAccesInfo
									key={index}
									data={room}
								/>
							))}
					</div>
				</div>
			</div>
			<PortalInfoSheet />
		</div>
	);
};

export default Portal;
