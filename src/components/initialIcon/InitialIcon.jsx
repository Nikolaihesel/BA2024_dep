import React from 'react';
import style from './initialIcon.module.scss';
const InitialIcon = ({ Initial }) => {
	return (
		<div className={style.initialIcon}>
			<p>{Initial}</p>
		</div>
	);
};

export default InitialIcon;
