import PrestadorNavBar from "./components/navBar/index.jsx";
import {BrowserRouter} from "react-router-dom";
import FretesPage from "./pages/FretesPage.jsx";


function App() {

  return (
    <>
        <BrowserRouter>
            <PrestadorNavBar/>
            <FretesPage/>
        </BrowserRouter>
    </>
  )
}

export default App
