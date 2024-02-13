import { useState } from 'react'

import { Navigate, Outlet } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { useAuth } from '../../lib/auth'

export const DashboardPage = () => {
	let auth = useAuth();

	const [isOpen, setIsOpen] = useState(false)
	const onClose = () => {
		setIsOpen(false)
	}

	if(!auth.user){
		return <Navigate
			to={{
				pathname: "/login",
				// state: { from: location }
			}}
		/>
	}

	return <div>
		<Header isOpen={isOpen} onMenuToggle={() => setIsOpen(!isOpen) }/>
		<Sidebar isOpen={isOpen} onClose={onClose} />
		<Outlet />
	</div>
}