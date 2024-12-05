import React from 'react';
import style from './portalInfo.module.scss';
import MachineTimer from '../machineTimer/MachineTimer';
import ContactPortal from '../contactPortal/ContactPortal';
const PortalInfoSheet = () => {
	return (
		<div className={style.portalInfo}>
			<p className={style.portalInfoHeader}>Live Machines</p>
			<MachineTimer />
			<MachineTimer />
			<MachineTimer />
			<br />
			<br />
			<br />
			<ContactPortal />
		</div>
	);
};

export default PortalInfoSheet;
