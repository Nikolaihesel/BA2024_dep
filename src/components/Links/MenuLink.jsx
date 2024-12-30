import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from '../Links/MenuLink.module.scss';

const MenuLink = ({ NavText, Param, Icon, SubMenu, isCollapsed }) => {
	const [showSub, setShowSub] = useState(false);

	return (
		<>
			<div
				onClick={() => setShowSub(!showSub)}
				className={style.navlinkWrapper}>
				<NavLink
					to={Param}
					className={({ isActive }) =>
						isActive ? style.navlinkActive : style.navlink
					}>
					{Icon && <span className={style.icon}>{Icon}</span>}
					{isCollapsed ? '' : NavText}
				</NavLink>
			</div>

			{SubMenu && showSub && (
				<ul className={style.submenu}>
					{SubMenu.map((submenuItem, index) => (
						<li key={index}>
							<NavLink
								to={submenuItem.path}
								className={({ isActive }) =>
									isActive ? style.submenuActive : style.submenuLink
								}>
								{submenuItem.label}
							</NavLink>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

MenuLink.propTypes = {
	NavText: PropTypes.string.isRequired,
	Param: PropTypes.string.isRequired,
	isCollapsed: PropTypes.bool,
	Icon: PropTypes.node,
	SubMenu: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
		})
	),
};

export default MenuLink;
