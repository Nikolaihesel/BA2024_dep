import MenuLink from '../Links/MenuLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBraille } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
	return (
		<div>
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
						Param='home'
						Icon={<FontAwesomeIcon icon={faUser} />}
					/>
				</li>
				<li>
					<MenuLink
						NavText='Machines'
						Param='home'
						Icon={<FontAwesomeIcon icon={faDesktop} />}
					/>
				</li>
				<li>
					<MenuLink
						NavText='Restart'
						Param='home'
						Icon={<FontAwesomeIcon icon={faPowerOff} />}
					/>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
