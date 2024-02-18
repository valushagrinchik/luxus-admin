import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlantationsListPage from "./pages/PlantationsListPage";
import SortsListPage from "./pages/SortsListPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import EditPlantationPage from "./pages/EditPlantationPage";
import CreatePlantationPage from "./pages/CreatePlantationPage";
import ViewPlantationPage from "./pages/ViewPlantationPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<DashboardPage />}
          errorElement={<ErrorPage />}
        >
          <Route path={"sorts"} element={<SortsListPage />} />
          <Route path={"plantations"} element={<PlantationsListPage />} />
          <Route
            path={"plantations/create"}
            element={<CreatePlantationPage />}
          />
          <Route
            path={"plantations/:plantationId/edit"}
            element={<EditPlantationPage />}
          />
          <Route
            path={"plantations/:plantationId"}
            element={<ViewPlantationPage />}
          />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
