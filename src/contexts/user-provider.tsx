"use client";

import { userSchema } from "@/types";
import { ReactNode, createContext, useContext } from "react";
import { z } from "zod";

const UserContext = createContext<{
	user: z.infer<typeof userSchema> | null;
} | null>(null);

export const UserProvider = ({
	user,
	children,
}: {
	user: z.infer<typeof userSchema> | null;
	children: ReactNode;
}) => {
	return (
		<UserContext.Provider value={{ user: user }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("No user context found!");
	const { user } = context;
	if (!user) throw new Error("No user found!");
	return user;
};
