import {Route, Routes} from "react-router-dom";
import PublicNavBar from "../components/navBar/PublicNavBar.jsx";
import PublicRoute from "./PublicRoute.jsx";
import LoginPage from "../pages/Public/Login/LoginPage.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import PrestadorNavBar from "../components/navBar/index.jsx";
import FretesPage from "../pages/Prestador/Fretes/FretesPage.jsx";
import CadastroPage from "../pages/Public/Cadastro/CadastroPage.jsx";
import CadastroPrestadorPage from "../pages/Public/Cadastro/CadastroPrestador/CadastroPrestadorPage.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<PublicNavBar/>}>
                <Route
                    path={'/login'}
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path={'/cadastro'}
                    element={
                        <PublicRoute>
                            <CadastroPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path={'/cadastro/prestador'}
                    element={
                        <PublicRoute>
                            <CadastroPrestadorPage />
                        </PublicRoute>
                    }
                />
            </Route>

            <Route path={'/fretes'} element={<PrestadorNavBar/>}>
                <Route
                    index={true}
                    element={
                        <AuthenticatedRoute>
                            <FretesPage />
                        </AuthenticatedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRouter;