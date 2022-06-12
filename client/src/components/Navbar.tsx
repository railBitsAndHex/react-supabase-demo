import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';
import "../styles/navbar.modules.css"
function Navbar() {
	const {user, session} = useAuth()
	const authStatus = user && session;
	return (
		<>
		  {authStatus && 
			<header className='nv-header'>
				<nav>
					<h1 className='nav-brand'><a href='/home'>React Supabase Demo</a></h1>
					<ul className='nav-links'>
						<li><a href='/profile'>Profile</a></li>
						<li><a href='#'>Edit Profile</a></li>
						<LogoutBtn/>
					</ul>
				</nav>
			</header>
			}
		</>
	);
}

export default Navbar;
