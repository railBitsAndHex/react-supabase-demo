import React from 'react';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import {toastError, toastSuccess} from '../utils/toastNotification';

function LogoutBtn() {
	const {logout} = useAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout();
			toastSuccess('Logging out');
			navigate('/home');
		} catch (error: unknown) {
			if (error instanceof Error) {
				toastError(error.message);
			}
		}
	};
	return (
		<>
			<Button onClick={handleLogout}>Logout</Button>
		</>
	);
}

export default LogoutBtn;
