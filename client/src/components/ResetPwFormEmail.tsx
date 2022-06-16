import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { TResetPassword } from '../types/authContext';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import validator from "validator"
import "../styles/resetPassword.modules.css"
import { useAuth } from '../context/AuthContext';
import { toastError, toastSuccess } from '../utils/toastNotification';
import { sleep } from '../utils/asyncUtils';
import { ToastContainer } from 'react-toastify';

function ResetPwFormEmail() {
  const {
		register,
		handleSubmit,
		// watch triggers re-render at root of app
		formState: {errors, isValid},
		reset,
		clearErrors
    } = useForm<TResetPassword>();
	const {resetPassword} = useAuth()
	const [resetDisabled, setResetDisabled] = useState<boolean>(false)
	useEffect(() => {
		Object.keys(errors).length === 0 ? setResetDisabled(false) : setResetDisabled(true)
	}, [Object.keys(errors).length])
  const emailReg = () => {
		return register('email', {
			required: {
				value: true,
				message: 'Email is required'
			},
			validate:{
				checkIsEmail: email => validator.isEmail(email) || "Please enter a valid email"
			},
			onChange: (e) => {
				const emailVal = e.target.value;
				validator.isEmail(emailVal) && clearErrors(['email'])
			}
		});
	};

  const handleReset = async(data: TResetPassword) => {
	try {
		try {
			await resetPassword(data);
			toastSuccess('A link to reset your password has been sent to your email.', 800);
			sleep(850);
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				throw error;
			}
		}
	}
	catch (error: unknown) {
		if (error instanceof Error) {
			toastError(error.message, 1000);
		}
	}
  }
  return (
    <>
      <form onSubmit={handleSubmit((data: TResetPassword) => handleReset(data))}>
        <FormControl className='form-control' isInvalid={errors.email && true}>
			<div id='resetpw-fcontrol-div-1'>
				<FormLabel id='resetpw-email-label'>Email</FormLabel>
				<div id='resetpw-fcontrol-div-2'>
            		<Input id='resetpw-input' {...emailReg()} type="email" placeholder='Enter your email'/>
					<FormErrorMessage id='reset-form-error-1'>{errors.email && errors.email.message}</FormErrorMessage>
				</div>
			</div>
        </FormControl>
		<button disabled={resetDisabled} id='resetpw-btn'>Send reset link</button>
      </form>
	  <ToastContainer/>
    </>
  )
}

export default ResetPwFormEmail