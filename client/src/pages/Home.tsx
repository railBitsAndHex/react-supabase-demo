import React from 'react';
import { supabase } from './../supabaseClient';
import { useAuth } from './../context/AuthContext';
function Home() {
	const { user, session } = useAuth();
	if (!(user && session)) {
		return (
			<>
				<div>Welcome to homepage</div>
			</>
		);
	}
	return <div>Welcome {user.id}</div>;
}

export default Home;
