import React, {useState, useEffect} from 'react';
import { useAuth } from './../context/AuthContext';
import { supabase } from '../supabaseClient';
import { toastError } from '../utils/toastNotification';
import {Link} from "react-router-dom"
import { TProfile } from '../types/profileTypes';

function Profile() {
	const {user, session} = useAuth();
	const [userData, setUserData] = useState<[] | Array<TProfile>>([])
	useEffect(() => {
		const fetchProfileData = async(uid: string) => {
			const {data, error} = await supabase.from('profiles')
			.select(`*`)
			.eq('id', user.id)
			if(error) {
				throw new Error("Unable to fetch user data!")
			}
			if (data) {
				console.log(data)
				console.log(data)
				setUserData(data);
				console.log(userData)
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
	const {username, name, avatar_url, website, description} = userData[0];
	return <>
		<section>
			<div>
				<div>Username</div>
				<div>{username === null ? <p>-</p> : <p>{'@'+username}</p>}</div>
			</div>			
			<div>
				<div>Name</div>
				<div>{name === null ? <p>-</p> : <p>{name}</p>}</div>
			</div>					
			<div>
				<div>Website</div>
				<div>{website === null ? <p>-</p> : <p>{website}</p>}</div>
			</div>			
			<div>
				<div>Description</div>
				<div>{description === null ? <p>-</p> : <p>{description}</p>}</div>
			</div>			
		</section>
	</>;
}

export default Profile;
 

