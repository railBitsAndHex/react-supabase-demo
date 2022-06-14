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
			toastError('Invalid params entered!',1000);
			return;
		}
		if (!validationLen1(password, 6)) {
			toastError('Password too short. Min. length required 6 characters',1000);
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
				if (error) {
					toastError(error.message, 1000);
				}
				if (data !== null && data.length > 0) {
					const errorMessage = 'This email has already been taken.';
					throw new Error(errorMessage);
				}
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
					const errorMessage =
						'Something went wrong! Unable to create an account. Please try again.';
					throw new Error(errorMessage);
				}
				setUser(user);
				setSession(session);
			} catch (error: unknown) {
				if (error instanceof Error) {
					throw error;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				throw error;
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
	const logout = async () => {
		try {
			try {
				const {error} = await supabase.auth.signOut();
				if (error) {
					throw new Error(error.message);
				}
			} catch (error: unknown) {
				throw error;
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
		login,
		logout
	};
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
