import React from 'react'

import {
	BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PlantationsListPage } from "./pages/PlantationsListPage/PlantationsListPage";
import { SortsListPage } from "./pages/SortsListPage/SortsListPage";
import ErrorPage from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";

export const AppRouter = () => {
	return <BrowserRouter>
		<Routes>
			<Route path={'/'} element={<DashboardPage />} errorElement={<ErrorPage />}>
				<Route path={'sorts'} element={<SortsListPage />} />
				<Route path={'plantations'} element={<PlantationsListPage />} />
			</Route>
			<Route path={'/login'} element={<LoginPage />} />
			<Route path={'*'} element={<NotFoundPage />} />
		</Routes>
	</BrowserRouter>
}
