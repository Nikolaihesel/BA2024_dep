import React from 'react';
import PropTypes from 'prop-types';
import style from './machineTimer.module.scss';

const MachineTimer = ({ Name, Uptime }) => {
	return (
		<div className={style.machineTimer}>
			<span className={style.title}>
				<p>{Name}</p> <p className={style.uptime}>{Uptime}</p>
			</span>
			<hr />
		</div>
	);
};

MachineTimer.propTypes = {
	Name: PropTypes.string.isRequired,
	Uptime: PropTypes.string.isRequired,
};

export default MachineTimer;
