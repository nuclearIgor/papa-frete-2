import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../contexts/AuthContext/AuthContextProvider.jsx";
import LoadingScreen from "../../../../components/Loading.jsx";
import EditarContatoForm from "./EditarContatoForm.jsx";
import EditarEnderecoForm from "./EditarEnderecoForm.jsx";
import ChangePasswordForm from "../../../../components/changePasswordForm.jsx";

const EditarPerfilTomadorPage = () => {

    const [loading, setLoading] = useState(false)

    const { userData, handleReload, token } = useContext(AuthContext)

    useEffect(() => {
        // console.log(userData)
        setLoading(true)

        setTimeout(() => setLoading(false), 200)
    }, [])

    if (loading) return <LoadingScreen/>

    return (
        <div className={''}>
            <h2 className={'text-center p-2 text-2xl'}>Editar perfil</h2>

            <div className={'pb-12'}>
                <EditarContatoForm tomadorData={userData} token={token} handleReload={handleReload}/>
                <EditarEnderecoForm tomadorData={userData} token={token} handleReload={handleReload}/>
                <ChangePasswordForm/>
            </div>

        </div>
    );
};

export default EditarPerfilTomadorPage;