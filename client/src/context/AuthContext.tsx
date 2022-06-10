import React, { useState, useContext, useEffect } from 'react';
import {
	IAuthContext,
	AuthStateInitial,
	AuthPropsType,
	TSignUp
} from './../types/authContext.d';
import { supabase } from '../supabaseClient';
import { toastError } from '../utils/toastNotification';
import { validation3 } from '../utils/validations';

const AuthContext = React.createContext<IAuthContext>(AuthStateInitial);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthPropsType) => {
	const [user, setUser] = useState<any>();
	const [session, setSession] = useState<any>();
	const [sessionTrigger, setSessionTrigger] = useState<boolean>(false);
	const signup = async (credentials: TSignUp) => {
		const { email, password, passwordCfm } = credentials;
		console.table(credentials);
		console.log(validation3(email, password, passwordCfm));

		if (!validation3(email, password, passwordCfm)) {
			console.log(validation3(email, password, passwordCfm));
			toastError('Invalid params entered!');
			return;
		}
		try {
			// Check if exists + email confirmed first
			try {
				const { data, error } = await supabase
					.from('puser')
					.select('*')
					.eq('email', email)
					.filter('email_confirmed_at', 'lt', 'now');
				if (error) {
					toastError(error.message);
					return;
				}
				if (data.length > 0) {
					toastError('This email has already been taken.');
					return;
				}
				console.log(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			}

			// Sign up the user
			try {
				const { user, session, error } = await supabase.auth.signUp({
					email: email,
					password: password
				});
				if (error) {
					console.error(error);
					toastError(error.message);
				}
				setUser(user);
				setSession(session);
				console.log(user);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			}
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			}
		}
	};
	const login = () => {
		console.log('This is auth contect login');
	};

	useEffect(() => {
		supabase.auth.onAuthStateChange((e, session) => {
			console.log('###session###');
			console.log(session);
			console.log('###');
			supabase.auth.user() !== null
				? setUser(supabase.auth.user())
				: setUser(undefined);
			if (session !== null) {
				setSession(session);
				setSessionTrigger(!sessionTrigger);
			} else {
				setSession(undefined);
			}
		});
	}, []);
	const values = {
		user,
		session,
		sessionTrigger,
		signup,
		login
	};
	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
};
