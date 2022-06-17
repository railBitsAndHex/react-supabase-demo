import React, { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import validator from 'validator';
import {useAuth} from './../context/AuthContext';
import {toastError, toastSuccess} from '../utils/toastNotification';
import { TProfile } from '../types/profileTypes';
import { FormControl, FormErrorMessage, FormLabel, InputLeftAddon, Stack, Input, InputGroup, Textarea, Button } from '@chakra-ui/react';
import { upsertProfile } from '../utils/profileEdit';
import { sleep } from '../utils/asyncUtils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import isURL from 'validator/lib/isURL';
function ProfileEditForm() {
    const {
		register,
		handleSubmit,
		watch,
		formState: {errors, isValid},
		setError,
		reset,
		clearErrors
	} = useForm<TProfile>();
    const navigate = useNavigate();
    const {user} = useAuth();
    const [disableUpdate, setDisableUpdate] = useState<boolean>(true);

    useEffect(() => {
        Object.keys(errors).length > 0 ? setDisableUpdate(true) : setDisableUpdate(false)
    }, [Object.keys(errors).length])

    const usernameReg = () => {
        const unameLengthErrMsg = 'Username should be between 5-30 characters long.';
        return register('username', {
            required: {
                value: true,
                message: 'Username is required.'
            },
            minLength: {
                value: 5,
                message: unameLengthErrMsg
            },
            maxLength: {
                value: 30,
                message: unameLengthErrMsg
            },
            onChange: (e) => {
                const unameVal = e.target.value;
                const unameLen = unameVal.length;
                switch(true) {
                    case (unameLen < 5):
                        setError('username', {
                            type: 'custom',
                            message: unameLengthErrMsg
                        })
                        break;
                    case (unameLen > 30):
                        setError('username', {
                            type:'custom',
                            message: unameLengthErrMsg
                        })
                        break;                        
                    default:
                        clearErrors(['username']);
                        break;
                }
            }
        })
    }
    const descriptionReg = () => {
        return register('description', {
            maxLength: {
                value: 100,
                message: "Maximum 100 characters."
            },
            onChange: (e) => {
                const descVal = e.target.value;
                if (descVal.length > 100) {
                    setError('description', {
                        type: 'custom',
                        message: 'Maximum 100 characters'
                    })
                    return;
                }
                clearErrors(['description'])

            }
        })
    }
    const websiteReg = () => {
        return register('website', {
            // validate: (value: string | undefined) => {
            //     if (value !== undefined && !isURL(value)) {
            //         return 'Please enter a valid website address'
            //     }
            //     return true
            // },
            onChange: (e) => {
                const descValue = e.target.value;
                if (descValue === "" || isURL(descValue)) {
                    clearErrors(['website']);
                    return;
                }
                if (!isURL(descValue)) {
                    setError('website', {
                        type:'custom',
                        message: 'Please enter a valid website address'
                    })
                } 
            },
        })
    }
    const handleUpdate = async(data: TProfile) => {
        try {
            try{
                console.log(user.id)
                const dataUpdate = {...data, id: user.id}
                await upsertProfile(dataUpdate);
                reset();
                toastSuccess('Successfully updated profile! Redirecting to profile page...', 800)
                await sleep(850);
                navigate('/profile')
            }catch(error:unknown) {
                if (error instanceof Error) {
                    throw error;
                }
            }
        }catch(error:unknown) {
            if (error instanceof Error) {
                toastError(error.message, 1000);
            }
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit((data: TProfile) => handleUpdate(data))}>
                <FormControl isInvalid={errors.username && true} className='profile-edit-form-control'>
                    <FormLabel>
                        <span className='profile-edit-label'>Username</span>
                    </FormLabel>
                    <InputGroup className='profile-edit-input' id='uname-input'>
                        <InputLeftAddon children='@'/>
                        <Input {...usernameReg()} placeholder='Enter username here' type='text'/>
                    </InputGroup>
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
                <FormControl className='profile-edit-form-control'  isInvalid={errors.name && true}>
                    <FormLabel>
                        <span className='profile-edit-label'>Name</span>
                    </FormLabel>
                    <Input className='profile-edit-input' id='name-input' placeholder='Enter name here' type="text"/>
                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>
                <FormControl className='profile-edit-form-control' isInvalid={errors.website && true}>
                    <FormLabel>
                        <span className='profile-edit-label'>Website</span>
                    </FormLabel>
                    <Input {...websiteReg()} className='profile-edit-input' id='website-input' placeholder='Enter website url here' type="text"/>
                    <FormErrorMessage>{errors.website && errors.website.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description && true} className='profile-edit-form-control profile-edit-desc' id=''>
                    <FormLabel>
                        <span className='profile-edit-label'>Description</span>
                    </FormLabel>
                    <Textarea id='profile-edit-textarea' {...descriptionReg()} placeholder='Write a short description of yourself here (max 100 char)'></Textarea>
                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                </FormControl>
                <Button id='update-profile-btn' disabled={disableUpdate} type='submit'>Update Profile</Button>
        </form>
        <ToastContainer/>
    </>)
}

export default ProfileEditForm