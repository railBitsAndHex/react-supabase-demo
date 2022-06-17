import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/emailConfirm.modules.css";

function EmailConfirm() {
	const navigate = useNavigate();
	const { session, sessionTrigger } = useAuth();
	useEffect(() => {
		if (session !== null && session !== undefined) {
			navigate('/');
		}
	}, [sessionTrigger]);
	return (
		<section className='email-confirm-sect-1'>
			<div className='email-confirm-div-1'>
				<div className='email-confirm-header'>Proceed to confirm email</div>
				<div className='email-confirm-subheader'>
					A confirmation link was sent to your email account. Please click to verify your account.
				</div>
			</div>
		</section>
	);
}

export default EmailConfirm;
