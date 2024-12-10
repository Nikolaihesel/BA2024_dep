import style from './machineTimer.module.scss';

const MachineTimer = ({ Name, Uptime }) => {
	return (
		<div className={style.machineTimer}>
			<span className={style.title}>
				<p>{Name}</p> <p>{Uptime}</p>
			</span>
			<hr />
		</div>
	);
};

export default MachineTimer;
