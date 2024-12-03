import React from 'react';
import style from './machineAccesInfo.module.scss';

const MachineAccesInfo = () => {
	const data = [
		{ sofie: 'QBOX 1', anonymous: 'No', path: '/path?target=1234' },
		{ sofie: 'QBOX 1', anonymous: 'No', path: '/path?target=1234' },
		{ sofie: 'QBOX 1', anonymous: 'No', path: '/path?target=1234' },
	];

	return (
		<div className={style.container}>
			<table className={style.table}>
				<thead>
					<tr>
						<th>Sofie</th>
						<th>Anonymous</th>
						<th>Path</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							<td>{row.sofie}</td>
							<td>{row.anonymous}</td>
							<td>{row.path}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MachineAccesInfo;
