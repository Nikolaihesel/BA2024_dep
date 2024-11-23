import React from 'react';
import PropTypes from 'prop-types';
import style from './Mainlayout.module.scss';

const Mainlayout = ({ Nav, Main }) => {
	return (
		<div className={style.mainlayout}>
			<nav>{Nav}</nav>
			<main>{Main}</main>
		</div>
	);
};

Mainlayout.propTypes = {
	Nav: PropTypes.node.isRequired,
	Main: PropTypes.node.isRequired,
};

export default Mainlayout;
