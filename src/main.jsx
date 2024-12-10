import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './Errorpage.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { element } from 'prop-types';
import Portal from './views/Portal.jsx';
import UserView from './views/UserView.jsx';
import Machines from './views/machines/Machines.jsx';
import AddUser from './views/addUser/AddUser.jsx';
import SocketTest from './components/SocketTest.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Portal /> },
			{
				path: 'user',
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{ index: true, element: <UserView /> },
					{
						path: 'add-user',
						element: <AddUser />,
					},
					{
						path: 'edit-user',
						element: <h1>Edit User</h1>,
					},
				],
			},
			{
				path: 'machines',
				element: <Machines />,
			},
			{
				path: 'restart',
				element: <SocketTest />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
