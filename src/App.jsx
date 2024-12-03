import Mainlayout from './components/LayoutModule/Mainlayout';
import { Outlet } from 'react-router-dom';
import './App.scss';

import Nav from './components/Nav/Nav';
import useAuthStore from './stores/AuthStore';
import SocketTest from './components/SocketTest';
import Login from './pages/Login';

function App() {
	const { user, isAuthenticated } = useAuthStore();
	return (
		<>
			{isAuthenticated ? (
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
			) : (
				<Login />
			)}
		</>
	);
}

export default App;
