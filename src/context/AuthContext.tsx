import {AuthContextType} from "../types/AuthContextType";
import {createContext, FunctionComponent, useContext, useEffect, useMemo, useState} from "react";
import React from 'react';
import {User} from "../types/User";
import {HttpMethods} from "../types/HttpMethods";
import jwtDecode from "jwt-decode";
import {useHistory} from "react-router-dom";

export type Fetcher = <T>(url: string, method: HttpMethods, body?: Record<string, unknown>) => Promise<T>;

const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
)

export const AuthProvider: FunctionComponent = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [expiration, setExpiration] = useState<Date | null>();
	const [token, setToken] = useState<string | null>();
	const history = useHistory();

	useEffect(() => {
		if(!user) {
			const sessionToken = sessionStorage.getItem("token");

			if(sessionToken) {
				setToken(sessionToken);
			}
		}
	}, [user])

	useEffect(() => {
		if(token && !user) getUser();
	}, [token]);

	const setAuthData = (user: User) => {
		const parsedToken = jwtDecode(user.token) as { exp: number };
		setUser(user);
		setExpiration(new Date(parsedToken.exp * 1000));
		setToken(user.token);
		sessionStorage.setItem("token", user.token);
	}

	const getUser = () => {
		fetcher<{ user: User }>("user", "GET")
			.then(data => setAuthData(data.user))
			.catch(e => console.error(e))
	}

	const loginUser: (email: string, password: string) => Promise<void> = async (email, password) => {
		const loginResult = await fetcher<{user: User}>("users/login", "POST", {user: { email, password}});
		setAuthData(loginResult.user);
	}

	const logout: () => void = () => {
		sessionStorage.removeItem("token");
		setUser(null);
	}

	const fetcher: Fetcher = async (url, method, body) => {
		const headers: HeadersInit = {
			"Content-type": "application/json",
		}

		if(token) {
			if(expiration) {
				const timeToExpire = expiration.getTime() - new Date().getTime();
				if(timeToExpire > 0) {
					// Refresh when 10 minutes or less left
					if((timeToExpire / 60000000) <= 10 && !url.includes("user")) {
						await getUser();
					}
				}
			}

			headers.Authorization = `Token: ${token}`
		}

		const response = await fetch(`${process.env.REACT_APP_API}${url}`, {
			method,
			body: JSON.stringify(body),
			headers
		})

		if (!response.ok) {
			if(response.status === 401) {
				history.push("/login");
				sessionStorage.removeItem("token")
			}

			throw new Error('Error while fetching data')
		} else {
			return response.json()
		}
	}

	const memoValue = useMemo(
		() => ({
			user,
			loginUser,
			logout,
			fetcher
		}), [user]
	)

	return (
		<AuthContext.Provider value={memoValue}>
			{ children }
		</AuthContext.Provider>
	);
};

export default function useAuth(): AuthContextType {
	return useContext(AuthContext);
};