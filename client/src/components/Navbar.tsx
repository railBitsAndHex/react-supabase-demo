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
					<h1 className='nav-brand'><a href='/home'>React Supabase Demo</a></h1>
					<ul className='nav-links'>
						<li><NavLink to="/profile">Profile</NavLink></li>
						<li><NavLink to="/#">Edit Profile</NavLink></li>
						<li><LogoutBtn/></li>
					</ul>
				</nav>
			</header>
			}
		</>
	);
}

export default Navbar;
