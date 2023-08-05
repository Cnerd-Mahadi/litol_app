import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext(null);

export const App = () => {
	return <Outlet />;
};
