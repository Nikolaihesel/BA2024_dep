import React from 'react';
import PropTypes from 'prop-types';

const Mainlayout = ({ Nav, Main }) => {
	return (
		<div>
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
