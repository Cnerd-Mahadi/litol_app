"use client";

import { auth } from "@/services/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import {
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}

interface AuthProviderProp {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProp> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const subscribe = onAuthStateChanged(auth, (user) => {
			user ? setUser(user) : setUser(null);
		});

		return () => subscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("Cannot use context outside the boundary");
	}

	return context;
};
