import {Route, Routes} from "react-router-dom";
import PublicNavBar from "../components/navBar/PublicNavBar.jsx";
import PublicRoute from "./PublicRoute.jsx";
import LoginPage from "../pages/Public/Login/LoginPage.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import FretesPage from "../pages/Prestador/Fretes/FretesPage.jsx";
import CadastroPage from "../pages/Public/Cadastro/CadastroPage.jsx";
import CadastroPrestadorPage from "../pages/Public/Cadastro/CadastroPrestador/CadastroPrestadorPage.jsx";
import CadastroTomadorPage from "../pages/Public/Cadastro/CadastroTomador/CadastroTomadorPage.jsx";
import PrivateNavbar from "../components/navBar/PrivateNavbar.jsx";
import NovoFretePage from "../pages/Tomador/NovoFrete/NovoFretePage.jsx";
import MeusFretesPage from "../pages/Tomador/MeusFretes/MeusFretesPage.jsx";
import TomadorFretePage from "../pages/Tomador/Frete/TomadorFretePage.jsx";
import PrestadorFretePage from "../pages/Prestador/Frete/PrestadorFretePage.jsx";
import MinhasCandidaturasPage from "../pages/Prestador/Candidaturas/MinhasCandidaturasPage.jsx";

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
                <Route
                    path={'/cadastro/tomador'}
                    element={
                        <PublicRoute>
                            <CadastroTomadorPage />
                        </PublicRoute>
                    }
                />
            </Route>

            <Route element={<PrivateNavbar/>}>
                    <Route
                        path={'/fretes/:freteId'}
                        element={
                            <AuthenticatedRoute>
                                <PrestadorFretePage />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path={'/fretes'}
                        element={
                            <AuthenticatedRoute>
                                <FretesPage />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path={'/minhas-candidaturas'}
                        element={
                            <AuthenticatedRoute>
                                <MinhasCandidaturasPage />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path={'/novo-frete'}
                        element={
                            <AuthenticatedRoute>
                                <NovoFretePage />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path={'/meus-fretes/:freteId'}
                        element={
                            <AuthenticatedRoute>
                                <TomadorFretePage />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path={'/meus-fretes'}
                        element={
                            <AuthenticatedRoute>
                                <MeusFretesPage />
                            </AuthenticatedRoute>
                        }
                    />
            </Route>

            {/*<Route path={'/fretes'} element={<PrivateNavbar/>}>*/}
            {/*    <Route*/}
            {/*        index={true}*/}
            {/*        element={*/}
            {/*            <AuthenticatedRoute>*/}
            {/*                <FretesPage />*/}
            {/*            </AuthenticatedRoute>*/}
            {/*        }*/}
            {/*    />*/}
            {/*</Route>*/}
        </Routes>
    );
};

export default AppRouter;