import React from 'react';
import { supabase } from './../supabaseClient';
import { useAuth } from './../context/AuthContext';

import "../styles/homepage.modules.css"
import { Button } from '@chakra-ui/react';
function Home() {
	const { user, session } = useAuth();
	const authState = user && session;
	if (!(authState)) {
		return (
			<>
				<section className='homepage-section-main'>
					<div className='homepage-div-1'>
						<h2 className='homepage-title'>React Supabase Demo</h2>
						<p className='homepage-subtitle1'>Demo for using Supabase</p> 
						<div className='rdr-btn-div'>
							<a href="/login">
								<Button id='login-rdr' className='homepage-rdr-btn' height={`50px`} width={'100px'} fontSize={'20px'} fontWeight={`bold`}>Login</Button>
							</a>
							<a href="/signup">
								<Button className='homepage-rdr-btn' id='signup-rdr' height={`50px`} width={'100px'} fontSize={'20px'} fontWeight={`bold`}>Signup</Button>
							</a>
						</div>
					</div>
				</section>
			</>
		);
	}
	return <>
		<section className='homepage-section-main'>
			<div className='homepage-div-1'>
				<h2 id='homepage-login-title'>Welcome {user.email}</h2>
			</div>
		</section>
	</>
}

export default Home;
