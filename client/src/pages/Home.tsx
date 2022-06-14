import React from 'react';
import { useAuth } from './../context/AuthContext';

import "../styles/homepage.modules.css"
import { Button } from '@chakra-ui/react';
function Home() {
	const { user, session } = useAuth();
	const authState = user && session;
	if (!(user && session)) {
		return (
			<>
				<section className='homepage-section-main'>
					<div className='homepage-div-1'>
						<h2 className='homepage-title'>React Supabase Demo</h2>
						<p className='homepage-subtitle1'>Demo for using Supabase with React</p>
						{authState ? <p>Welcome {user.email}</p> : <a href="/login"><Button className='homepage-login-rdr-btn' height={`50px`} width={'100px'} fontSize={'20px'} fontWeight={`bold`}>Login</Button></a>}
					</div>
				</section>
			</>
		);
	}
	return <div>Welcome {user.id}</div>;
}

export default Home;
