import { useState, useEffect } from 'react';
import style from './machines.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PortalInfoSheet from '../../components/portalInfoSheet/PortalInfoSheet.jsx';

const Machines = () => {
	const [room, setRoom] = useState([]);

	const getRooms = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/rooms/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log(data);
			setRoom(data.rooms);
		} catch (error) {
			console.error('Error fetching rooms:', error);
		}
	};

	useEffect(() => {
		getRooms();
	}, []);

	return (
		<div className={style.rowWrapper}>
			<div className={style.portalWrapper}>
				<div className={style.menuHeaderWrapper}>
					<p className={style.menuHeader}>
						User
						<select className={style.thinFont}>
							<option value='Afd Lyd'> Afd. Lyd </option>
							<option value='Afd D'> Afd. D </option>
							<option value='Afd S'> Afd. S </option>
						</select>
					</p>

					<div className={style.iconWrapper}>
						<FontAwesomeIcon icon={faUser} />
						<p>Change user</p>
					</div>
				</div>
				<hr />

				<div className={style.unitWrapper}>
					{room &&
						room.map((room, index) => (
							<div
								className={style.unit}
								key={index}>
								<p className={style.unitTitle}>{room.name}</p>

								<button className={style.selectButton}>Q1</button>
								<button className={style.selectButton}>Q1</button>
								<button className={style.selectButton}>Q1</button>
								<button className={style.selectButton}>Q1</button>
								<button className={style.selectButton}>Q1</button>
								<button className={style.selectButton}>Q1</button>
								<button className={style.selectButton}>Q1</button>
							</div>
						))}
				</div>
			</div>
			<PortalInfoSheet />
		</div>
	);
};

export default Machines;
