import React, { useState, useEffect } from 'react';
import style from './addUserWrapper.module.scss';

const AddUser = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [department, setDepartment] = useState('');
	const [departments, setDepartments] = useState([]);

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
			setDepartments(data.departments);
			console.log(departments);
		} catch (error) {
			console.error('Error fetching departments:', error);
		}
	};

	useEffect(() => {
		getDepartments();
	}, [departments < 1 && departments]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				'https://ba2024.onrender.com/api/users/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, password, role, department }),
				}
			);

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={style.addUserWrapper}>
			<p className={style.heading}>Add New User</p>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className={style.formInputs}>
					<div className={style.spacer}>
						<div className={style.inputAndLabel}>
							<label>Username</label>
							<input
								type='text'
								placeholder='Username'
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className={style.inputAndLabel}>
							<label>Password</label>
							<input
								type='password'
								placeholder='Password'
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className={style.spacer}>
						<div className={style.inputAndLabel}>
							<label>Role</label>
							<select
								name='role'
								id='role'
								onChange={(e) => setRole(e.target.value)}
								required>
								<option value=''>Select Role</option>
								<option value='admin'>Admin</option>
								<option value='user'>User</option>
							</select>
						</div>
						<div className={style.inputAndLabel}>
							<label>Department</label>
							<select
								name='department'
								id='department'
								onChange={(e) => {
									setDepartment(e.target.value);
									console.log('Selected department:', e.target.value);
								}}
								required>
								<option value=''>Select Department</option>
								{departments.map((dept) => (
									<option
										key={dept._id}
										value={dept._id}>
										{dept.departmentName}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<hr />
				<p className={style.subheading}>User Access Groups</p>

				<div className={style.userAccesRights}>
					<p className={style.smallText}>Group Access Rights</p>
					<div className={style.gap}>
						<button
							type='button'
							className={style.userButton}>
							Create Group
						</button>
						<button
							type='button'
							className={style.userButton}>
							Add To Existing Group
						</button>
					</div>
				</div>
				<hr />
				<button
					type='submit'
					className={style.userButton}>
					Create User
				</button>
			</form>
		</div>
	);
};

export default AddUser;
