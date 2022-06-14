import React, {useState, useEffect} from 'react';
import { useAuth } from './../context/AuthContext';
import { supabase } from '../supabaseClient';
import { toastError } from '../utils/toastNotification';
import { dataAttr } from '@chakra-ui/utils';
import {Link} from "react-router-dom"

function Profile() {
	const {user, session} = useAuth();
	const [userData, setUserData] = useState<any[]>([])
	useEffect(() => {
		const fetchProfileData = async(uid: string) => {
			const {data, error} = await supabase.from('profiles')
			if(error) {
				throw new Error("Unable to fetch user data!")
			}
			if (data) {
				console.log(data)
				console.log(data)
				setUserData(data);
			}
		} 
		try {	
			fetchProfileData(user.id)
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				toastError(error.message, 1000)
			}
		}
	}, [])
	if (userData.length === 0) {
		return <>
			<section>
				<div>Profile not yet updated. Would you like to update your profile?</div><Link to='edit'>Edit Profile</Link>
			</section>
		</>
	}
	return <></>;
}

export default Profile;
 

