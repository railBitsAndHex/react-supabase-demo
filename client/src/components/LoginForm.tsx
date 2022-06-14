import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {FormErrorMessage, FormLabel, FormControl, Input, Button} from '@chakra-ui/react';
import {TLogin} from '../types/authContext';
import {useAuth} from '../context/AuthContext';
import {NavLink, useNavigate} from 'react-router-dom';
import {toastError, toastSuccess} from '../utils/toastNotification';
import {ToastContainer} from 'react-toastify';
import {sleep} from '../utils/asyncUtils';
import { Link } from 'react-router-dom';
function LoginForm() {
	const {
		register,
		handleSubmit,
		// watch triggers re-render at root of app
		formState: {errors, isValid},
		reset
	} = useForm<TLogin>();
	const {login, user, session} = useAuth();
	const navigate = useNavigate();
	console.log(errors);
	const emailRegister = () => {
		return register('email', {
			required: 'Email is required',
			pattern: {
				value: /[0-9]*[a-z]+[0-9]*@([a-z]+[0-9]*[a-z]+\.)+/,
				message: 'Please enter a valid email format'
			}
		});
	};
	const pwRegister = () => {
		return register('password', {
			required: 'Password is required'
		});
	};

	const handleLogin = async (data: TLogin) => {
		try {
			try {
				await login(data);
				reset();
				toastSuccess('Successfully log in!.', 800);
				await sleep(850);
				navigate('/profile');
			} catch (error: unknown) {
				if (error instanceof Error) {
					toastError(error.message, 850);
					reset();
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				toastError('Unable to login! Something went wrong.', 1000);
				console.log(error.message);
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleLogin(data))}>
				<FormControl className='form-control'>
					<FormLabel>Email</FormLabel>
					<Input className='login-input' placeholder='email' type='email' {...emailRegister()} />
					{errors.email && errors.email.message}
				</FormControl>
				<FormControl className='form-control'>
					<FormLabel>Password</FormLabel>
					<Input className='login-input' placeholder='password' type='password' {...pwRegister()} />
					{errors.password && errors.password.message}
				</FormControl>
				<button className='login-btn form-control' type='submit'>Login</button>
			</form>
			<div className='login-div-2'>Don't have an account? 
				<NavLink className="navlink" to="/signup">Create</NavLink> <NavLink className="navlink" to="/#">Reset password</NavLink>
			</div>
			<ToastContainer />
		</>
	);
}

export default LoginForm;
