import style from './Nav.module.scss';

import MenuLink from '../Links/MenuLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBraille } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
	return (
		<div className={style.nav}>
			<h1 className={style.titleHeader}>Sofie Portalen</h1>
			<ul>
				<li>
					<MenuLink
						NavText='Portal'
						Param='/'
						Icon={<FontAwesomeIcon icon={faBraille} />}
					/>
				</li>
				<li>
					<MenuLink
						NavText='Users'
						Param='user'
						Icon={<FontAwesomeIcon icon={faUser} />}
						SubMenu={[
							{ label: 'Add User', path: '/user/add-user' },
							{ label: 'Edit User', path: '/user/edit-user' },
						]}
					/>
				</li>
				<li>
					<MenuLink
						NavText='Machines'
						Param='machines'
						Icon={<FontAwesomeIcon icon={faDesktop} />}
					/>
				</li>
				<li>
					<MenuLink
						NavText='Restart'
						Param='restart'
						Icon={<FontAwesomeIcon icon={faPowerOff} />}
					/>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
