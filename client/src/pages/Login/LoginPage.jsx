import LoginForm from "./LoginForm.jsx";
import {login} from "./requests.js";
import {useContext, useState} from "react";
import LoadingScreen from "../../components/Loading.jsx";
import toast from "react-hot-toast";
import {AuthContext} from "../../contexts/AuthContext/AuthContextProvider.jsx";

const LoginPage = () => {
    const [loading, setLoading ] = useState(false)

    const { handleLogin } = useContext(AuthContext);
    const from = location.state?.from?.pathname || '/';

    const onSubmit = async (values) => {
        setLoading(true)

        const data = await login(values)

        if (!data) {
            toast.error('algo deu errado :( \ntente novamente em alguns minutos')
            return
        }
        if (data === 'usuario ou senha incorretos') {
            toast.error('usuario ou senha incorretos')
            return
        }

        handleLogin(data, from);


        // console.log(values)
        setTimeout(() => setLoading(false), 1500)
    }

    if (loading) return <LoadingScreen/>

    return (
        <div>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    );
};

export default LoginPage;