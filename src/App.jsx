import React from 'react';
import Mainlayout from './components/LayoutModule/Mainlayout';
import { Outlet } from 'react-router-dom';
import './App.scss';

import Nav from './components/Nav/Nav';
import useAuthStore from './stores/AuthStore';
import Login from './pages/Login';

function App() {
	const { isAuthenticated } = useAuthStore();
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
