import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Toaster} from "react-hot-toast";
import AppRouter from "./router/AppRouter.jsx";
import NovoFretePage from "./pages/Tomador/NovoFrete/NovoFretePage.jsx";
import EditarPerfilPrestadorPage from "./pages/Prestador/Perfil/EditarPerfil/EditarPerfilPage.jsx";
import MyNavbar from "./components/navBar/MyNavBar.jsx";

export const baseUrl = import.meta.env.PROD
    ? 'https://papa-frete-node-app-esey3.ondigitalocean.app'
    : 'http://localhost:3000';

const queryClient = new QueryClient()

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            {/*<MyNavbar/>*/}

            {/*<div className={'my-40'}></div>*/}
            <AppRouter/>
            {/*<NovoFretePage/>*/}
        </QueryClientProvider>
    </>
  )
}

export default App
