import React from 'react';
import style from './machineAccesInfo.module.scss';

const MachineAccesInfo = ({ data }) => {
	return (
		<div className={style.container}>
			<table className={style.table}>
				<thead>
					<tr>
						<th>{data.name}</th>
						<th>State</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{data.machines &&
						data.machines.length > 0 &&
						data.machines.map((machine, index) => (
							<tr key={index}>
								<td>{machine.name}</td>
								<td>{machine.state}</td>
								<td>{machine.value}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default MachineAccesInfo;
