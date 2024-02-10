import React from 'react'

import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { Sidebar } from "../../components/Sidebar/Sidebar"

export const DashboardPage = () => {
	return <div>
		<Header />
		<Sidebar />
		<Outlet />
	</div>
}