import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext/AuthContextProvider.jsx";

const PublicRoute = ({ children }) => {
    const { token, userData } = useContext(AuthContext);

    // if (token && userData.tipoDeConta === 'prestador') {
    //     return <Navigate to="/fretes" replace />;
    // }
    //
    // if (token) {
    //     return <Navigate to="/home" replace />;
    // }

    return (
        <>
            {children}
            {/*<Footer/>*/}
        </>
    );
};

export default PublicRoute;
