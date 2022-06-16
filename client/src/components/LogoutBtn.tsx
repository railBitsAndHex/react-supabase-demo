import React from 'react';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import {toastError, toastSuccess} from '../utils/toastNotification';
import { sleep } from '../utils/asyncUtils';
import { ToastContainer } from 'react-toastify';
import "../styles/logoutbtn.modules.css"
function LogoutBtn() {
	const {logout} = useAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
    try{
		try {
			await logout();
			toastSuccess('Logging out', 200);
			sleep(250)
			navigate('/home');
		} catch (error: unknown) {
			if (error instanceof Error) {
				toastError(error.message, 1000);
		}
		} 
	}
	catch (error: unknown) {
			if (error instanceof Error) {
				toastError(error.message, 1000);
			}
		}
	};
	return (
		<>
			<button className='logout-btn' onClick={handleLogout}>
				Logout
			</button>
			<ToastContainer/>
		</>
	);
}

export default LogoutBtn;
