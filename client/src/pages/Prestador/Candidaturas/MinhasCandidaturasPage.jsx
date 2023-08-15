import {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import {useQuery} from "@tanstack/react-query";
import LoadingScreen from "../../../components/Loading.jsx";
import {fetchCandidaturas} from "./requests.js";
import EditFrete from "../../Tomador/Frete/EditFrete.jsx";
import CandidaturasPendentes from "./CandidaturasPendentes.jsx";
import CandidaturasAceitas from "./CandidaturasAceitas.jsx";
import CandidaturasRecusadas from "./CandidaturasRecusadas.jsx";

const MinhasCandidaturasPage = () => {
    const [pageState, setPageState] = useState('aceitas')

    const { token } = useContext(AuthContext)

    const { data, isLoading } = useQuery({
        queryKey: ['minhas-candidaturas'],
        queryFn: async () => await fetchCandidaturas(token)

    })

    if (isLoading) return <LoadingScreen />

    const candidaturasRecusadas = data?.candidaturas.filter(candidatura => candidatura.aceita === false)
    const candidaturasPendentes = data?.candidaturas.filter(candidatura => candidatura.aceita === null)
    const candidaturasAceitas = data?.candidaturas.filter(candidatura => candidatura.aceita === true)

    return (
        <div>
            <div className={'flex justify-center w-10/12 mt-2 pb-4 bg-base-100  mx-auto'}>
                <div
                    onClick={() => setPageState('recusadas')}
                    className={`basis-1/6 p-5 shadow-lg mx-2 rounded-md cursor-pointer hover:opacity-50
                    ${pageState === 'recusadas' ? 'border-b-2 bg-papaYellow shadow-sm' : '' }
                    `}
                >
                    Candidaturas recusadas ({candidaturasRecusadas?.length})
                </div>

                <div
                    onClick={() => setPageState('pendentes')}
                    className={`basis-1/6 p-5  shadow-lg rounded-md cursor-pointer hover:opacity-50
                    ${pageState === 'pendentes' ? 'border-b-2 bg-papaYellow shadow-sm' : '' }
                    `}
                >
                    Candidaturas pendentes ({candidaturasPendentes?.length})
                </div>

                <div
                    onClick={() => setPageState('aceitas')}
                    className={`basis-1/6 p-5  shadow-lg rounded-md cursor-pointer hover:opacity-50
                    ${pageState === 'aceitas' ? 'border-b-2 bg-papaYellow shadow-sm' : '' }
                    `}
                >
                    Candidaturas aceitas ({candidaturasAceitas?.length})
                </div>

            </div>

            <div className={'w-10/12 p-4 mx-auto border border-papaYellow rounded-box'}>
                {pageState === 'pendentes' ?
                    <CandidaturasPendentes candidaturas={candidaturasPendentes}/>
                    : null
                }
                {pageState === 'aceitas' ?
                    <CandidaturasAceitas candidaturas={candidaturasAceitas}/>
                    : null
                }
                {pageState === 'recusadas' ?
                    <CandidaturasRecusadas candidaturas={candidaturasRecusadas}/>
                    : null
                }
            </div>
        </div>
    );
};

export default MinhasCandidaturasPage;