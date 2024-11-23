import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from '../Links/MenuLink.module.scss';

const MenuLink = ({ NavText, Param, Icon }) => {
	return (
		<NavLink
			to={Param}
			className={({ isActive }) =>
				isActive ? style.navlinkActive : style.navlink
			}>
			{NavText}
			{Icon ? Icon : null}
		</NavLink>
	);
};

MenuLink.propTypes = {
	NavText: PropTypes.string.isRequired,
	Param: PropTypes.string.isRequired,
	Icon: PropTypes.node,
};

export default MenuLink;
