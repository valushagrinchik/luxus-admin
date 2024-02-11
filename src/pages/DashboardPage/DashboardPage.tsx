import React, { useState } from 'react'

import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { Sidebar } from "../../components/Sidebar/Sidebar"

export const DashboardPage = () => {

	const [isOpen, setIsOpen] = useState(false)
	const onClose = () => {
		setIsOpen(false)
	}

	return <div>
		<Header onMenuToggle={() => setIsOpen(!isOpen) }/>
		<Sidebar isOpen={isOpen} onClose={onClose} />
		<Outlet />
	</div>
}