import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Toaster} from "react-hot-toast";
import AppRouter from "./router/AppRouter.jsx";
import NovoFretePage from "./pages/Tomador/NovoFrete/NovoFretePage.jsx";

export const baseUrl = import.meta.env.PROD
    ? 'https://papa-frete-node-app-esey3.ondigitalocean.app'
    : 'http://localhost:3000';

const queryClient = new QueryClient()

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            <AppRouter/>
            {/*<NovoFretePage/>*/}
        </QueryClientProvider>
    </>
  )
}

export default App
