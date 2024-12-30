import React, { useState } from 'react';
import style from './addUserWrapper.module.scss';

const AddUser = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [department, setDepartment] = useState('');

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
			<form action=''>
				<div className={style.formInputs}>
					<div className={style.spacer}>
						<div className={style.inputAndLabel}>
							<label> UserName</label>
							<input
								type='text'
								placeholder='Username'
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className={style.inputAndLabel}>
							<label>Password</label>
							<input
								type='password'
								placeholder='Password'
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className={style.spacer}>
						<div className={style.inputAndLabel}>
							<label htmlFor=''> Role</label>
							<select
								name='role'
								id='role'
								onChange={(e) => setRole(e.target.value)}>
								<option defaultValue='true'>Select Role</option>
								<option value='admin'>Admin</option>
								<option value='user'>User</option>
							</select>
						</div>
						<div className={style.inputAndLabel}>
							<label htmlFor=''> Department</label>
							<select
								name='department'
								id='department'
								onChange={(e) => setDepartment(e.target.value)}>
								<option defaultValue='true'>Select Department</option>
								<option value='Afd Lyd'>Afd. Lyd</option>
								<option value='Afd D'>Afd. D</option>
								<option value='Afd S'>Afd. S</option>
							</select>
						</div>
					</div>
				</div>
				<hr />
				<p className={style.subheading}>User Access Groups</p>

				<div className={style.userAccesRights}>
					<p className={style.smallText}> Group Access Rights</p>
					<div className={style.gap}>
						<button className={style.userButton}>Create Group</button>
						<button className={style.userButton}>Add To Existing Group</button>
					</div>
				</div>
				<hr />
			</form>

			<button onClick={handleSubmit}>Create user</button>
		</div>
	);
};

export default AddUser;
