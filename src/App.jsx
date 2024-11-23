import MenuLink from './components/Links/MenuLink';
import Mainlayout from './components/LayoutModule/Mainlayout';
import { Outlet } from 'react-router-dom';

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
			Main={
				<>
					<Outlet />
				</>
			}
		/>
	);
}

export default App;
