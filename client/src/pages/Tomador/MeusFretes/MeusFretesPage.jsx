import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import {useQuery} from "@tanstack/react-query";
import {fetchMeusFretes} from "./requests.js";
import {BsTruck} from "react-icons/bs";
import LoadingScreen from "../../../components/Loading.jsx";
import FreteCard from "../../Prestador/Fretes/FreteCard.jsx";
import MeuFreteCard from "./MeuFreteCard.jsx";
import FretesVisiveis from "./FretesVisiveis.jsx";
import FretesOcultos from "./FretesOcultos.jsx";

const MeusFretesPage = () => {
    const { token } = useContext(AuthContext)

    const { data, loading } = useQuery({
        queryKey: ['meus-fretes'],
        queryFn: () => fetchMeusFretes(token)
    })

    const [visiveisOcultos, setVisiveisOcultos] = useState('visiveis')

    useEffect(() => {
        // const userData = cookies.get('userData')
        // console.log(userData)
        console.log('data:', data)
    }, [data])

    if ( loading ) return <LoadingScreen/>

    const fretesVisiveis = data?.fretes?.filter(frete => frete.visivel)
    const fretesOcultos = data?.fretes?.filter(frete => !frete.visivel)

    return (
        <div>
            <h2
                className={'font-bold text-2xl text-center py-4'}
            >
                Meus <span className={'border-b-2 border-papaYellow'}>fretes</span>
                <BsTruck className={'inline text-5xl ml-2'}/>
            </h2>
            <div>
                <div className={'flex justify-center'}>
                    <div className={'flex gap-4 font-semibold'}>
                        <span
                            onClick={() => setVisiveisOcultos('visiveis')}
                            className={`${visiveisOcultos === 'visiveis' 
                                ? 
                                'border-b-2 border-papaYellow' : ''
                            }`}
                        >
                            Visiveis ({fretesVisiveis?.length})
                        </span>

                        <span
                            onClick={() => setVisiveisOcultos('ocultos')}
                            className={`${visiveisOcultos === 'ocultos' 
                                ? 
                                'border-b-2 border-papaYellow' : ''
                            }`}
                        >
                            Ocultos ({fretesOcultos?.length})
                        </span>
                    </div>
                </div>

                {visiveisOcultos === 'visiveis' ?
                    <FretesVisiveis fretes={fretesVisiveis}/>
                    :
                    <FretesOcultos fretes={fretesOcultos}/>
                }
            </div>


            {/*<div className={''}>*/}
            {/*    {data?.fretes.map(frete => <MeuFreteCard key={frete.id} frete={frete}/>)}*/}
            {/*</div>*/}
        </div>
    );
};

export default MeusFretesPage;