import {AuthContextType} from "../types/AuthContextType";
import {Context, createContext, FunctionComponent, useContext, useEffect, useMemo, useState} from "react";
import React from 'react';
import {User} from "../types/User";
import login from "../services/login";


const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
)

export const AuthProvider: FunctionComponent = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const loginUser: (email: string, password: string) => Promise<void> = async (email, password) => {
		const loginResult = await login(email, password);
		setUser(loginResult.user);
	}

	const logout: () => void = () => {
		setUser(null);
	}

	const memoValue = useMemo(
		() => ({
			user,
			loginUser,
			logout
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