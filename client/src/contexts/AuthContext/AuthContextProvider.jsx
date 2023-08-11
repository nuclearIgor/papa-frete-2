import {createContext, useEffect, useState} from "react";
import Cookie from 'universal-cookie/es6';
import {useNavigate} from "react-router-dom";
import {baseUrl} from "../../App.jsx";
import axios from "axios";

export const AuthContext = createContext({
    token: '',
    handleLogin: () => null,
    handleLogout: () => null,
    userData: {},
    setUserData: () => null,
});

const cookies = new Cookie();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(cookies.get('token'));
    const [userData, setUserData] = useState(cookies.get('userData'));

    useEffect(() => {
        console.log('userData: \n', userData);
    }, [userData]);

    const handleLogin = async (loginData, from) => {
        // console.log('logindata: \n', loginData)
        const { token } = loginData;
        const { userData } = loginData;

        cookies.set('token', token);

        setUserData({ ...userData });
        setToken(token);

        if (userData.tipoDeConta === 'prestador') {
            const res = await axios.get(`${baseUrl}/api/prestadores/me`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            setUserData({
                ...userData,
                prestador: res.data.prestador,
            });
        }

        cookies.remove('userData')
        cookies.set('userData', JSON.stringify({ ...userData }));

        if (from === '/') {
            navigate('/home');
            return;
        }

        navigate(from, { replace: true });
    };

    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('userData');
        setToken('');
        setUserData('');
        navigate('/login');
    };

    const value = {
        token,
        handleLogin,
        handleLogout,
        userData,
        setUserData,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}