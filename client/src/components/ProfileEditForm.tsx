import React, { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import {useAuth} from './../context/AuthContext';
import {toastError, toastSuccess} from '../utils/toastNotification';
import { TProfile } from '../types/profileTypes';
import { FormControl, FormErrorMessage, FormLabel, InputLeftAddon, Stack, Input, InputGroup, Textarea, Button } from '@chakra-ui/react';
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
                console.log(`Username: ${unameVal}`)
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
    const desriptionReg = () => {
        return register('description', {
            maxLength: {
                value: 100,
                message: "Maximum 100 characters."
            },
            onChange: (e) => {
                const descVal = e.target.value;
                console.log(descVal);
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
    const handleUpdate = (data: TProfile) => {
        
    }
    return (
        <>
        <form onSubmit={handleSubmit((data: TProfile) => handleUpdate(data))}>
            <Stack direction={['column']}>
                <FormControl isInvalid={errors.username && true}>
                    <FormLabel>Username</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children='@'/>
                        <Input {...usernameReg()} placeholder='Enter username here' type='text'/>
                    </InputGroup>
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Enter name here' type="text"/>
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Website</FormLabel>
                    <Input placeholder='Enter website url here' type="text"/>
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description && true}>
                    <FormLabel>Description</FormLabel>
                    <Textarea {...desriptionReg()} placeholder='Write a short description of yourself here (max 100 char)'></Textarea>
                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                </FormControl>
                <Button disabled={disableUpdate} type='submit'>Update Profile</Button>
            </Stack>
        </form>
    </>)
}

export default ProfileEditForm