import React, { useState } from 'react';
import style from './Nav.module.scss';
import MenuLink from '../Links/MenuLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBraille } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import useAuthStore from '../../stores/AuthStore';

const Nav = () => {
	const { user } = useAuthStore();
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div className={style.nav}>
			<h1 className={style.titleHeader}>Sofie Portalen</h1>
			{/* <button onClick={() => setIsCollapsed(!isCollapsed)}> collapse</button> */}
			<ul>
				<li>
					<MenuLink
						NavText={isCollapsed ? '' : 'Portal'}
						Param='/'
						Icon={<FontAwesomeIcon icon={faBraille} />}
					/>
				</li>
				{user.role === 'admin' && (
					<li>
						<MenuLink
							NavText={isCollapsed ? '' : 'Users'}
							Param='user'
							isCollapsed={isCollapsed}
							Icon={<FontAwesomeIcon icon={faUser} />}
							SubMenu={[{ label: 'Add User', path: '/user/add-user' }]}
						/>
					</li>
				)}

				<li>
					<MenuLink
						NavText={isCollapsed ? '' : 'Machines'}
						Param='machines'
						Icon={<FontAwesomeIcon icon={faDesktop} />}
					/>
				</li>
				<li>
					<MenuLink
						NavText={isCollapsed ? '' : 'Restart'}
						Param='restart'
						Icon={<FontAwesomeIcon icon={faPowerOff} />}
					/>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
