import React from 'react';
import style from './table.module.scss';
import InitialIcon from '../components/initialIcon/InitialIcon';

const Table = () => {
	const data = [
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
		{ user: 'Afvikling D', label: 'Afv.D', team: 'Gallery Automation' },
	];

	return (
		<div className={style.container}>
			<h2 className={style.title}>All users</h2>
			<table className={style.table}>
				<thead>
					<tr>
						<th>User</th>
						<th>Label</th>
						<th>Team</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							<td className={style.userCell}>
								<InitialIcon Initial={row.user[0]} />
								<span>{row.user}</span>
							</td>
							<td>{row.label}</td>
							<td>{row.team}</td>
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
