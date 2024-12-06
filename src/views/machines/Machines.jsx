import style from './machines.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PortalInfoSheet from '../../components/portalInfoSheet/PortalInfoSheet.jsx';

const Machines = () => {
	return (
		<div className={style.rowWrapper}>
			<div className={style.portalWrapper}>
				<div className={style.menuHeaderWrapper}>
					<p className={style.menuHeader}>
						User <span className={style.thinFont}> AFD lyd </span>
					</p>

					<div className={style.iconWrapper}>
						<FontAwesomeIcon icon={faUser} />
						<p>Change user</p>
					</div>
				</div>
				<hr />

				<div className={style.unitWrapper}>
					<div className={style.unit}>
						<p className={style.unitTitle}>Unit 1</p>

						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
					</div>
					<div className={style.unit}>
						<p className={style.unitTitle}>Unit 1</p>

						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
					</div>
					<div className={style.unit}>
						<p className={style.unitTitle}>Unit 1</p>

						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
					</div>
					<div className={style.unit}>
						<p className={style.unitTitle}>Unit 1</p>

						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
						<button className={style.selectButton}>Q1</button>
					</div>
				</div>
			</div>
			<PortalInfoSheet />
		</div>
	);
};

export default Machines;
