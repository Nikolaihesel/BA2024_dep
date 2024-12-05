import style from './machineTimer.module.scss';

const MachineTimer = () => {
	return (
		<div className={style.machineTimer}>
			<span className={style.title}>
				<p>Sisyfoss</p> <p>08:32</p>
			</span>
			<hr />
		</div>
	);
};

export default MachineTimer;
