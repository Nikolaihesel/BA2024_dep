import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './table.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import InitialIcon from '../components/initialIcon/InitialIcon';

const Table = () => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	const fetchUsers = async () => {
		try {
			const response = await fetch(
				'https://ba2024.onrender.com/api/users/users',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const data = await response.json();
			setUsers(data.users);
			console.log(data);
		} catch (error) {
			console.log('' + error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className={style.container}>
			<h2 className={style.title}>All users</h2>
			<table className={style.table}>
				<thead>
					<tr>
						<th>User</th>
						<th>Role</th>
						<th>Team</th>
						<th
							onClick={() => navigate('/user/add-user')}
							className={style.addIcon}>
							<FontAwesomeIcon icon={faSquarePlus} />
						</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.length > 0 &&
						users.map((user, index) => (
							<tr key={index}>
								<td className={style.userCell}>
									<InitialIcon Initial={user.username[0]} />
									<span>{user.username}</span>
								</td>
								<td>{user.role}</td>
								<td>{user.department}</td>
								<td>
									<button className={style.editButton}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											className={style.editIcon}>
											<path d='M3 17.25V21h3.75l11-11-3.75-3.75-11 11zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
										</svg>
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
