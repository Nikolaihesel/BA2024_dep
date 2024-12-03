import React, { useState } from 'react';
import useAuthStore from '../stores/AuthStore';
import './Login.scss';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const login = useAuthStore((state) => state.login);

	const handleLogin = async () => {
		setLoading(true);
		try {
			const response = await fetch('http://localhost:3000/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();

			if (response.ok) {
				setTimeout(() => {
					setLoading(false);
				}, 1500);
				login(data.user, data.token);
			} else {
				setError(data.message);
			}
		} catch (error) {
			setError('Noget gik galt');
		}
	};

	return (
		<div className='login-page'>
			<div className='form-wrapper'>
				<h1 className='titleHeader'>
					<span> So</span>fie Portalen
				</h1>
				<form>
					<div className='input-container'>
						<label> Indtast brugernavn</label>
						<input
							type='text'
							placeholder='Indtast din email'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className='input-container'>
						<label> Indtast Password</label>
						<input
							type='password'
							placeholder='Indtast din password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</form>
				<button
					className={`login-button ${loading ? 'loading' : ''}`}
					onClick={!loading ? handleLogin : null}
					disabled={loading}>
					{loading ? <div className='spinner'></div> : 'Login'}
				</button>
			</div>
		</div>
	);
};

export default Login;
