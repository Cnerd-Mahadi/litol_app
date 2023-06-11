import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../layouts/partials/Footer";
import { Header } from "../../layouts/partials/Header";
export const StudentLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};
