import React from 'react';
import PropTypes from 'prop-types'; // For type-checking
import style from './machineAccesInfo.module.scss';

const MachineAccesInfo = ({ data }) => {
	const machineData = [
		{ sofie: 'QBOX 1', anonymous: 'No', path: '/path?target=1234' },
		{ sofie: 'QBOX 2', anonymous: 'Yes', path: '/path?target=5678' },
		{ sofie: 'QBOX 3', anonymous: 'No', path: '/path?target=91011' },
	];
	return (
		<div className={style.container}>
			<table className={style.table}>
				<thead>
					<tr>
						<th>{data.name}</th>
						<th>Anonymous</th>
						<th>Path</th>
					</tr>
				</thead>
				<tbody>
					{machineData &&
						machineData.length > 0 &&
						machineData.map((row, index) => (
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
