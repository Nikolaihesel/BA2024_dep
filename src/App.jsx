import MenuLink from './components/Links/MenuLink';
import Mainlayout from './components/LayoutModule/Mainlayout';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import Nav from './components/Nav/Nav';

function App() {
	return (
		<Mainlayout
			Nav={
				<>
					<Nav />
				</>
			}
			Main={<Outlet />}
		/>
	);
}

export default App;
