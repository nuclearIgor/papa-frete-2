import {createContext, useEffect, useState} from "react";
// import Cookie from 'universal-cookie/es6';
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";
import {baseUrl} from "../../App.jsx";
import axios from "axios";

export const AuthContext = createContext({
    token: '',
    handleLogin: () => null,
    handleLogout: () => null,
    userData: {},
    setUserData: () => null,
    handleReload: () => null,
});

// const cookies = new Cookie();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(Cookies.get('token'));
    const [userData, setUserData] = useState(Cookies.get('userData'));

    useEffect(() => {
        console.log('userData: \n', userData);
    }, [userData]);

    const handleLogin = async (loginData, from) => {
        console.log('logindata: \n', loginData)
        const { token } = loginData;

        Cookies.remove('token')
        Cookies.set('token', token);

        setUserData(loginData);
        setToken(token);

        Cookies.remove('tipoDeConta')
        Cookies.set('tipoDeConta', loginData.tipoDeConta);

        Cookies.remove('email')
        Cookies.set('email', loginData.email);

        if (from === '/' && loginData.tipoDeConta === 'prestador') {
            navigate('/fretes');
            return;
        }

        if (from === '/' && loginData.tipoDeConta === 'tomador') {
            navigate('/meus-fretes');
            return;
        }

        navigate(from, { replace: true });
    };

    const handleLogout = () => {

        Cookies.remove('token');
        Cookies.remove('userData');
        setToken('');
        setUserData('');
        navigate('/login');
    };

    const handleReload = async () => {
        const tipoDeConta = Cookies.get('tipoDeConta')
        const token = Cookies.get('token')
        const email = Cookies.get('email')

        if (!tipoDeConta) {
            handleLogout()
        }

        if (tipoDeConta === 'tomador') {
            const { data } = await axios.get(`${baseUrl}/api/tomadores/me`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUserData({
                tipoDeConta,
                email,
                ...data.tomador
            })
        }

        if (tipoDeConta === 'prestador') {
            const { data } = await axios.get(`${baseUrl}/api/prestadores/me`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUserData({
                tipoDeConta,
                email,
                ...data.prestador
            })
        }

    }

    const value = {
        token,
        handleLogin,
        handleLogout,
        userData,
        setUserData,
        handleReload
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}