import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../contexts/AuthContext/AuthContextProvider.jsx";
import LoadingScreen from "../../../../components/Loading.jsx";
import EditarDadosPessoaisForm from "./EditarDadosPessoaisForm.jsx";
import EditarEnderecoForm from "./EditarEnderecoForm.jsx";
import EditarVeiculoForm from "./EditarVeiculoForm.jsx";


const EditarPerfilPrestadorPage = () => {

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
               <EditarDadosPessoaisForm prestadorData={userData} token={token} handleReload={handleReload}/>
               <EditarEnderecoForm prestadorData={userData} token={token} handleReload={handleReload}/>
               <EditarVeiculoForm prestadorData={userData} token={token} handleReload={handleReload}/>
           </div>

        </div>
    );
};

export default EditarPerfilPrestadorPage;