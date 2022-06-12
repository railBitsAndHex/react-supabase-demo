import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormLabel, FormControl, Input, Button, FormErrorMessage, Stack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {TSignUp} from '../types/authContext';
import {useAuth} from './../context/AuthContext';
import {ToastContainer} from 'react-toastify';
import {toastError, toastSuccess} from '../utils/toastNotification';
import {sleep} from '../utils/asyncUtils';
function SignupForm() {
	const [disableSignup, setDisableSignup] = useState<boolean>(true);
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors, isValid},
		setError,
		reset,
		clearErrors
	} = useForm<TSignUp>();
	const {signup} = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		Object.keys(errors).length === 0 ? setDisableSignup(false) : setDisableSignup(true);
	}, [Object.keys(errors).length]);

	const emailReg = () => {
		return register('email', {
			required: {
				value: true,
				message: 'Email is required'
			},
			pattern: {
				value: /[0-9]*[a-z]+[0-9]*@([a-z]+[0-9]*[a-z]+\.)+/,
				message: 'Please enter a valid email format'
			}
		});
	};
	const passwordReg = () => {
		return register('password', {
			required: {
				value: true,
				message: 'Password field is required'
			},
			minLength: {
				value: 6,
				message: 'Please enter a password of minimum 6 characters!'
			},
			validate: (value: string) => {
				const pwCfmValue: string = watch().passwordCfm;
				if (pwCfmValue === value) {
					clearErrors(['passwordCfm', 'password']);
					return true;
				} else {
					return 'Passwords do not match!';
				}
			}
		});
	};
	const passwordCfmReg = () => {
		return register('passwordCfm', {
			required: {
				value: true,
				message: 'Confirm Password field is empty!'
			},
			onChange: (e) => {
				const pwValue: string = watch().password;
				const cfmPwValue: string = e.target.value;
				if (pwValue === cfmPwValue) {
					clearErrors(['passwordCfm', 'password']);
					return true;
				} else {
					setError('passwordCfm', {
						type: 'custom',
						message: 'Passwords do not match'
					});
				}
			},

			validate: (value: string) => {
				const pwValue: string = watch().password;
				if (pwValue === value) {
					clearErrors(['passwordCfm', 'password']);
					return true;
				} else {
					return 'Passwords do not match!';
				}
			}
		});
	};

	const handleSignUp = async (data: TSignUp) => {
		try {
			try {
				await signup(data);
				reset();
				toastSuccess('Successfully processed details. Redirecting...');
				await sleep(3000);
				navigate('confirmation-email');
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				toastError(error.message);
			}
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit((data: TSignUp) => handleSignUp(data))}>
				<Stack spacing={3}>
					<FormControl isInvalid={errors.email && true}>
						<FormLabel>Email</FormLabel>
						<Input {...emailReg()} type='email' placeholder='Email' />
						<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.password && true}>
						<FormLabel>Password</FormLabel>
						<Input {...passwordReg()} type='password' placeholder='Password' />
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.passwordCfm && true}>
						<FormLabel htmlFor='passwordCfm'>Confirm Password</FormLabel>
						<Input
							{...passwordCfmReg()}
							type='password'
							placeholder='Confirm Password'
						/>
						<FormErrorMessage>
							{errors.passwordCfm && errors.passwordCfm.message}
						</FormErrorMessage>
					</FormControl>
					<Button disabled={disableSignup} type='submit'>
						Sign up
					</Button>
				</Stack>
			</form>
			<ToastContainer />
		</>
	);
}

export default SignupForm;
