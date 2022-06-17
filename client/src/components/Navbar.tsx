import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';
import "../styles/navbar.modules.css"
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
	const {user, session} = useAuth()
	const authStatus = user && session;
	return (
		<>
		  {authStatus && 
			<header className='nv-header'>
				<nav>
					<h1 className='nav-brand'><Link to='/home'>React Supabase Demo</Link></h1>
					<ul className='nav-links'>
						<li><Link to="/profile">Profile</Link></li>
						<li><Link to="/profile/edit">Edit Profile</Link></li>
						<li><LogoutBtn/></li>
					</ul>
				</nav>
			</header>
			}
		</>
	);
}

export default Navbar;
