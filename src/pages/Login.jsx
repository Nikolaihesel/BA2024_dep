import React, { useState } from 'react';
import useAuthStore from '../stores/AuthStore';
import style from './login.module.scss';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { login } = useAuthStore.getState();

	const handleLogin = async () => {
		setLoading(true);
		setError('');

		try {
			const response = await fetch(
				'http://ba2024.onrender.com/api/users/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, password }),
				}
			);

			const data = await response.json();
			if (response.ok) {
				login(data.user, data.token);
				setTimeout(() => {
					setLoading(false);
				}, 15000);
			} else {
				setError(data.message || 'Login failed');
				setLoading(false);
			}
		} catch (error) {
			setError('Noget gik galt');
			setLoading(false);
		}
	};

	return (
		<div className={style.loginPage}>
			<div className={style.formWrapper}>
				<h1 className={style.titleHeader}>
					<span> So</span>fie Portalen
				</h1>
				<form>
					<div className={style.inputContainer}>
						<label> Indtast brugernavn</label>
						<input
							type='text'
							placeholder='Indtast din email'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className={style.inputContainer}>
						<label> Indtast Password</label>
						<input
							type='password'
							placeholder='Indtast din password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</form>
				<button
					className={`${style.loginButton} ${loading ? style.loading : ''}`}
					onClick={!loading ? handleLogin : null}
					disabled={loading}>
					{loading ? <div className={style.spinner}></div> : 'Login'}
				</button>

				{error && <p className={style.error}>{error}</p>}
			</div>
		</div>
	);
};

export default Login;
