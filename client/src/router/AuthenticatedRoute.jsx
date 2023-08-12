import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthContext/AuthContextProvider.jsx";
import axios from 'axios';
import { baseUrl } from '../App.jsx';

const AuthenticatedRoute = ({ children }) => {
    const location = useLocation();

    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    const validateToken = async () => {
        let res;
        try {
            res = await axios.get(`${baseUrl}/api/auth/validate-token`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
            if (e.response.status === 401) {
                navigate('/login');
                return;
            }
            console.log(e);
            navigate('/login');
        }

        // console.log(res);
    };

    useEffect(() => {
        validateToken();
    }, []);

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default AuthenticatedRoute;
