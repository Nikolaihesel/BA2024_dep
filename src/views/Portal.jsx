import React from 'react';
import style from './viewStyles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import InitialIcon from '../components/initialIcon/InitialIcon';
import PortalInfoSheet from '../components/portalInfoSheet/PortalInfoSheet';
import MachineAccesInfo from '../components/machineAcces/MachineAccesInfo';
import useAuthStore from '../stores/AuthStore';

const Portal = () => {
	const { user, isAuthenticated } = useAuthStore();
	return (
		<div className={style.rowWrapper}>
			<div className={style.portalWrapper}>
				<div className={style.menuHeaderWrapper}>
					<p className={style.menuHeader}>
						Current User{' '}
						<span className={style.thinFont}> {user.username} </span>
					</p>

					<div className={style.iconWrapper}>
						<FontAwesomeIcon icon={faUser} />
						<p>Change user</p>
					</div>
				</div>
				<hr />
				<div className={style.userInfoWrapper}>
					<InitialIcon Initial={user.username[0]} />
					<p className={style.menuHeader}>
						User ID <span className={style.thinFont}> AFVD </span>
					</p>
					<p className={style.menuHeader}>
						Label <span className={style.thinFont}> Afv D </span>
					</p>
					<p className={style.menuHeader}>
						Ember Target <span className={style.thinFont}> 001 </span>
					</p>
				</div>

				<div className={style.userAccessWrapper}>
					<div className={style.menuHeaderWrapper}>
						<p className={style.menuHeader}>User Access Rights</p>
						<div className={style.iconWrapper}>
							<FontAwesomeIcon icon={faUser} />
							<p>Edit Rights</p>
						</div>
					</div>
					<hr />
					<div className={style.machineAccessInfo}>
						<MachineAccesInfo />
						<MachineAccesInfo />
					</div>
				</div>
			</div>
			<PortalInfoSheet />
		</div>
	);
};

export default Portal;
