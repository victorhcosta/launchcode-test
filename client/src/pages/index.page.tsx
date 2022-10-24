import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { httpClient } from '../configs';
import { accessToken } from '../constants/storage';

const Home: React.FC = () => {
	const [username, setUsername] = useState('');
	const [showUsernameErrorMessage, setShowUsernameErrorMessage] = useState(false);
	const [password, setPassword] = useState('');
	const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const { push } = useRouter();

	const authenticate = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowUsernameErrorMessage(!username);
		setShowPasswordErrorMessage(!password);

		if (!username || !password) return;

		httpClient
			.post('login', { username, password })
			.then(({ data }) => {
				sessionStorage.setItem(accessToken, data.access_token);
				push('/home');
			})
			.catch(error => {
				setErrorMessage(error?.response?.data?.message);
				setShowErrorMessage(true);
			});
	};

	return (
		<main className='min-vw-100 min-vh-100 container-fluid main d-flex flex-column justify-content-center'>
			<header className='row text-center mb-4'>
				<h1>Welcome</h1>
			</header>
			<section className='row'>
				<form className='d-flex align-items-center flex-column' onSubmit={authenticate}>
					<span className='col-12 col-md-3'>
						<label className='form-label' htmlFor='username'>
							Username
						</label>
						<input
							className='form-control'
							id='username'
							placeholder='What is your username?'
							value={username}
							onChange={event => setUsername(event.target.value)}
						/>
						{showUsernameErrorMessage && (
							<p className='form-text text-danger'>
								username is required
							</p>
						)}
					</span>
					<span className='col-12 col-md-3 mt-4 mb-4'>
						<label className='form-label' htmlFor='password'>
							Password
						</label>
						<input
							className='form-control'
							type='password'
							id='password'
							placeholder='Your password'
							value={password}
							onChange={event => setPassword(event.target.value)}
						/>
						{showPasswordErrorMessage && (
							<p className='form-text text-danger'>
								password is required
							</p>
						)}
					</span>
					<div className='col-12 col-md-3 d-grid'>
						<button className='btn btn-primary'>Login</button>
					</div>
					{showErrorMessage && (
							<p className='form-text text-danger'>
								{JSON.stringify(errorMessage)}
							</p>
						)}
				</form>
			</section>
		</main>
	);
};

export default Home;
