import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const RoomContextProvider = () => {
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await fetch(
					'http://localhost:3000/api/rooms/get-all-rooms-with-machines'
				);
				const data = await response.json();
				setRooms(data.rooms);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching rooms:', error);
				setLoading(false);
			}
		};

		fetchRooms();
	}, []);

	if (loading) return <p>Loading rooms...</p>;

	return <Outlet context={{ rooms }} />;
};

export default RoomContextProvider;
