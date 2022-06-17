import React, {useState, useEffect} from 'react';
import { useAuth } from './../context/AuthContext';
import { supabase } from '../supabaseClient';
import { toastError } from '../utils/toastNotification';
import {Link} from "react-router-dom"
import { TProfile } from '../types/profileTypes';
import "../styles/profilePage.modules.css"
function Profile() {
	const {user, session} = useAuth();
	const [userData, setUserData] = useState<[] | Array<TProfile>>([])
	useEffect(() => {
		const fetchProfileData = async(uid: string) => {
			const {data, error} = await supabase.from('profiles')
			.select(`*`)
			.eq('id', uid)
			if(error) {
				throw new Error("Unable to fetch user data!")
			}
			if (data) {
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
			<section className='profile-sect-1'>
				<div className='profile-sect1-div1'>Profile not yet updated.<br/>Would you like to update your profile?</div>
				<div>
					<Link to='edit'>
						<button id='edit-rdr'>Edit Profile</button>
					</Link>
				</div>
			</section>
		</>
	}
	const {username, name, avatar_url, website, description} = userData[0];
	console.table(userData[0])
	return <>
		<section className='profile-sect-1 profile-info'>
			<h1 id='profile-info-h1'>Profile Information</h1>
			<section className='profile-sect-2'>
				<div className='pdata-div'>
					<div className='pdata-div-label'>Username</div>
					<div>{username === null ? <p>-</p> : <p>{'@'+username}</p>}</div>
				</div>			
				<div className='pdata-div'>
					<div className='pdata-div-label'>Name</div>
					<div>{name === null ? <p>-</p> : <p>{name}</p>}</div>
				</div>					
				<div className='pdata-div'>
					<div className='pdata-div-label'>Website</div>
					<div>{website === null ? <p>-</p> : <p>{website}</p>}</div>
				</div>			
				<div className='pdata-div-desc'>
					<div className='pdata-div-label'>Description</div>
					<div>{description === "" ? <p>-</p> : <p>{description}</p>}</div>
				</div>			
			</section>
		</section>
	</>;
}

export default Profile;
 

