
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoginPage from "./pages/Public/Login/LoginPage.jsx";
import {Toaster} from "react-hot-toast";
import AppRouter from "./router/AppRouter.jsx";
import CadastroPage from "./pages/Public/Cadastro/CadastroPage.jsx";


export const baseUrl = import.meta.env.PROD
    ? 'https://papa-frete-node-app-esey3.ondigitalocean.app'
    : 'http://localhost:3000';

const queryClient = new QueryClient()

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            {/*<Daisynav/>*/}
            <AppRouter/>
            {/*<PrestadorNavBar/>*/}
            {/*<LoginPage/>*/}
        </QueryClientProvider>
    </>
  )
}

export default App
