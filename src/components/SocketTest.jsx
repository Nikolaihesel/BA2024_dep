import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocketTest = () => {
	// Function to handle the restart action
	const handleRestart = () => {
		// Show a "Restarting..." toast
		toast.info('Restarting...', {
			position: 'top-center', // Centered position
			autoClose: 2000, // Close after 2 seconds
		});

		// Show "Restart successful!" toast after a delay
		setTimeout(() => {
			toast.success('Restart successful!', {
				position: 'top-center', // Centered position
				autoClose: 3000, // Close after 3 seconds
			});
		}, 2000); // Delay for 2 seconds to mimic the restart process
	};

	return (
		<div style={{ padding: '20px' }}>
			<h2>Socket Test</h2>
			<button
				onClick={handleRestart}
				style={{
					padding: '10px 20px',
					fontSize: '16px',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
				}}>
				Restart
			</button>
			{/* Toast Container for notifications */}
			<ToastContainer />
		</div>
	);
};

export default SocketTest;
