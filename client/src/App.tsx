import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {AuthProvider} from './context/AuthContext';
import EmailConfirm from './pages/EmailConfirm';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

function App() {
	return (
		<>
			<AuthProvider>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='signup/confirmation-email' element={<EmailConfirm />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
				</main>
			</AuthProvider>
		</>
	);
}

export default App;
