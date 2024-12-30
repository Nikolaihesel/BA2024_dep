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
	const [departments, setDepartments] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState('');

	const getDepartments = async () => {
		try {
			const response = await fetch(
				'https://ba2024.onrender.com/api/departments/',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			const userDepartments = data.departments.filter((dept) =>
				user.departments.some((userDept) => userDept._id === dept._id)
			);
			setDepartments(userDepartments);
			if (userDepartments.length > 0) {
				setSelectedDepartment(userDepartments[0]._id);
				setRooms(userDepartments[0].rooms);
			}
		} catch (error) {
			console.error('Error fetching departments:', error);
		}
	};

	const handleDepartmentChange = (event) => {
		const departmentId = event.target.value;
		setSelectedDepartment(departmentId);
		const selectedDept = departments.find((dept) => dept._id === departmentId);
		setRooms(selectedDept ? selectedDept.rooms : []);
	};

	useEffect(() => {
		getDepartments();
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
								id='department'
								value={selectedDepartment}
								onChange={handleDepartmentChange}>
								<option value=''>Select Department</option>
								{departments.map((department) => (
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
						{rooms.length > 0 ? (
							rooms.map((room) => (
								<MachineAccesInfo
									key={room._id}
									data={room}
								/>
							))
						) : (
							<p>No rooms available for the selected department.</p>
						)}
					</div>
				</div>
			</div>
			<PortalInfoSheet />
		</div>
	);
};

export default Portal;
