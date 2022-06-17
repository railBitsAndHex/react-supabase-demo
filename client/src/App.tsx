import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import {AuthProvider} from './context/AuthContext';
import EmailConfirm from './pages/EmailConfirm';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Signup from './pages/Signup';
import ResetPasswordEmail from './pages/ResetPasswordEmail';
import ResetPassword from './pages/ResetPassword';
import { ReactNode } from 'react';
import PrivateRoute from './components/PrivateRoute';


function App() {
	return (
		<>
			<AuthProvider>
				<main className='App-main'>
					<Navbar/>
					<Routes>
						<Route path='/home' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/signup/confirmation-email' element={<EmailConfirm />} />
						<Route path='/forgot-password' element={<ResetPasswordEmail/>}/>
						<Route path='/protected' element={<PrivateRoute/>}>
							<Route path='/protected/profile' element={<Profile />} />
							<Route path='/protected/profile/edit' element={<ProfileEdit/>}/>
							<Route path='/protected/reset-password' element={<ResetPassword/>} />
						</Route>
						<Route path='/*' element={<Home/>}/>
					</Routes>
				</main>
			</AuthProvider>
		</>
	);
}
export default App;
