import PrestadorNavBar from "./components/navBar/index.jsx";
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoginPage from "./pages/Login/LoginPage.jsx";
import {Toaster} from "react-hot-toast";

export const baseUrl = import.meta.env.PROD
    ? 'https://papa-frete-node-app-esey3.ondigitalocean.app'
    : 'http://localhost:3000';

const queryClient = new QueryClient()

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <PrestadorNavBar/>
            <Toaster/>
            <LoginPage/>
        </QueryClientProvider>
    </>
  )
}

export default App
