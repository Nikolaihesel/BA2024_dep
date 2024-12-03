import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './Errorpage.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { element } from 'prop-types';
import Portal from './views/Portal.jsx';

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
					{ index: true },
					{
						path: 'add-user',
						element: <h1>Add User</h1>,
					},
					{
						path: 'edit-user',
						element: <h1>Edit User</h1>,
					},
				],
			},
			{
				path: 'machines',
				element: <h1>Machines</h1>,
			},
			{
				path: 'restart',
				element: <h1>Restart</h1>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
