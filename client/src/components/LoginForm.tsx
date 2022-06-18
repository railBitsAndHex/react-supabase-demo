import React, {useState, useEffect} from 'react';
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
	const [disableLogin, setDisableLogin] = useState<boolean>(true);
	useEffect(() => {
		Object.keys(errors).length === 0 ? setDisableLogin(false) : setDisableLogin(true);
	}, [Object.keys(errors).length]);
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
			required:{
				value:true,
				message: "This field is required."
			}
		});
	};

	const handleLogin = async (data: TLogin) => {
		try {
			try {
				await login(data);
				reset();
				toastSuccess('Successfully log in!.', 800);
				await sleep(850);
				reset();
				navigate('/protected/profile');
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
				<FormControl className='form-control' isInvalid= {errors.email && true}>
					<FormLabel>Email</FormLabel>
					<Input className='login-input' placeholder='email' type='email' {...emailRegister()} />
					<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
				</FormControl>
				<FormControl className='form-control' isInvalid={errors.password && true}>
					<FormLabel>Password</FormLabel>
					<Input className='login-input' placeholder='password' type='password' {...pwRegister()} />
					<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
				</FormControl>
				<button disabled={disableLogin} className='login-btn form-control' type='submit'>Login</button>
			</form>
			<div className='login-div-2'>Don't have an account? 
				<NavLink className="navlink" to="/signup">Create Account</NavLink> <NavLink className="navlink" to="/forgot-password">Reset password</NavLink>
			</div>
			<ToastContainer />
		</>
	);
}

export default LoginForm;
