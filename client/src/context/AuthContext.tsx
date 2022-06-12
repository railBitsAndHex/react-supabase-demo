import React, {useState, useContext, useEffect} from 'react';
import {
	IAuthContext,
	AuthStateInitial,
	AuthPropsType,
	TSignUp,
	TLogin
} from './../types/authContext.d';
import {supabase} from '../supabaseClient';
import {toastError} from '../utils/toastNotification';
import {validation3, validationLen1} from '../utils/validations';

const AuthContext = React.createContext<IAuthContext>(AuthStateInitial);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({children}: AuthPropsType) => {
	const [user, setUser] = useState<any>();
	const [session, setSession] = useState<any>();
	const [sessionTrigger, setSessionTrigger] = useState<boolean>(false);
	const signup = async (credentials: TSignUp) => {
		const {email, password, passwordCfm} = credentials;
		if (!validation3(email, password, passwordCfm)) {
			toastError('Invalid params entered!');
			return;
		}
		if (!validationLen1(password, 6)) {
			toastError('Password too short. Min. length required 6 characters');
			return;
		}
		try {
			// Check if exists + email confirmed first
			try {
				const {data, error} = await supabase
					.from('puser')
					.select('*')
					.eq('email', email)
					.filter('email_confirmed_at', 'lt', 'now');
				console.log(data);
				if (error) {
					toastError(error.message);
					throw new Error(error.message);
				}
				if (data !== null && data.length > 0) {
					toastError('This email has already been taken.');
					throw new Error('This email has already been taken!');
				}
				console.log(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					throw new Error(error.message);
				}
			}

			// Sign up the user
			try {
				const {user, session, error} = await supabase.auth.signUp({
					email: email,
					password: password
				});
				if (error) {
					toastError(error.message);
					throw new Error(error.message);
				}
				setUser(user);
				setSession(session);
			} catch (error: unknown) {
				if (error instanceof Error) {
					throw new Error(error.message);
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	};
	const login = async (credentials: TLogin) => {
		try {
			const {email, password} = credentials;
			try {
				const {data, error} = await supabase
					.from('puser')
					.select('*')
					.eq('email', email)
					.filter('email_confirmed_at', 'lt', 'now');
				if (error) {
					toastError(error.message);
					throw new Error(error.message);
				}
				if (data === null || Object.keys(data).length == 0 || data.length === 0) {
					const errMessage = 'User does not exists. Please create an account!';
					throw new Error(errMessage);
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					throw error;
				}
			}

			try {
				const {user, session, error} = await supabase.auth.signIn({
					email: email,
					password: password
				});
				if (error) {
					throw new Error(error.message);
				}
				setUser(user);
				setSession(session);
			} catch (error: unknown) {
				if (error instanceof Error) {
					throw error;
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw error;
			}
		}
	};

	useEffect(() => {
		supabase.auth.onAuthStateChange((e, session) => {
			supabase.auth.user() !== null ? setUser(supabase.auth.user()) : setUser(undefined);
			if (session !== null) {
				console.log(e);
				setSession(session);
				console.log(session);
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
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
