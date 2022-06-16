import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { toastError, toastSuccess } from '../utils/toastNotification';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/resetPassword.modules.css";
import { sleep } from '../utils/asyncUtils';
import { ToastContainer } from 'react-toastify';
type TResetPwForm = {
  password: string, 
  passwordCfm: string
}
function ResetPwFormPassword() {
  const {
		register,
		handleSubmit,
		// watch triggers re-render at root of app
		formState: {errors, isValid},
    watch,
		reset,
		clearErrors,
    setError
    } = useForm<TResetPwForm>();
  const navigate = useNavigate()
  const {resetPassword} = useAuth()

  console.log('hello')
  try {
    const params = useParams();
    console.log('params')
    console.log(params)
  } catch(error) {
    if (error instanceof Error){
      console.log(error.message)
    }
  }

  const [disableReset, setDisableReset] = useState<boolean>(true);
	useEffect(() => {
		Object.keys(errors).length === 0 ? setDisableReset(false) : setDisableReset(true);
	}, [Object.keys(errors).length]);

  const passwordReg = () => {
    return register('password', {
      required: {
        value: true,
        message: "This field is required."
      },
      minLength: {
        value: 6,
        message: "Min. length of 6 for password"
      },
      validate: (value: string) => {
        const passwordCfm = watch().passwordCfm;
        if (passwordCfm === value) {
          clearErrors(['password', 'passwordCfm']);
          return true;
        }
        else {
          return 'Passwords do not match!'
        }
      }
    })
  }

  const passwordCfmReg = () => {
    return register('passwordCfm', {
      required: {
        value: true,
        message: 'This field is required'
      },
      onChange: (e) => {
        const passwordCfm = e.target.value;
        const password = watch().password;
        if (password !== passwordCfm) {
          setError('passwordCfm', {
            type: 'custom',
            message: 'Passwords do not match'
          });
          return;
        }
        clearErrors(['password','passwordCfm']);
        return true;
      }
    })
  }

  const handleResetPassword = async(data: TResetPwForm) => {
    try {
      console.log(data)
      const {password, passwordCfm} = data;
      if (password !== passwordCfm)
        throw new Error(`Passwords do not match!`)
      try {
        await resetPassword(data);
        reset();
        toastSuccess('Successfully reset password!', 800);
        await sleep(850);
        navigate("/home");
      }
      catch(error: unknown) {
        if (error instanceof Error) {
          toastError(error.message, 1000)
        }
      }
    }
    catch(error) {
      if (error instanceof Error) {
        toastError(error.message, 1000)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit((data: TResetPwForm) => handleResetPassword(data))}> 
        <FormControl className='form-control' isInvalid={errors.password && true}>
          <FormLabel>Password</FormLabel>
          <Input {...passwordReg()} type="password" placeholder='Password'/>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.passwordCfm && true}>
          <FormLabel>Confirm Password</FormLabel>
          <Input {...passwordCfmReg()} type="password" placeholder='Confirm Password'/>
          <FormErrorMessage>{errors.passwordCfm && errors.passwordCfm.message}</FormErrorMessage>
        </FormControl>
        <button disabled={disableReset} id='pw-reset' className='login-btn form-control' type='submit'>Reset Password</button>
      </form>
      <ToastContainer/>
    </>
  )
}

export default ResetPwFormPassword

// https://zmefsccnvyhbacecpxnu.supabase.co/auth/v1/verify?token=fymuqofqikvbyxbhcdyd&type=recovery&redirect_to=http://localhost:3000/login