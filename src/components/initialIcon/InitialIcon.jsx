import React from 'react';
import PropTypes from 'prop-types';
import style from './initialIcon.module.scss';

const InitialIcon = ({ Initial }) => {
	return (
		<div className={style.initialIcon}>
			<p>{Initial.toUpperCase()}</p>
		</div>
	);
};

InitialIcon.propTypes = {
	Initial: PropTypes.string.isRequired,
};

export default InitialIcon;
