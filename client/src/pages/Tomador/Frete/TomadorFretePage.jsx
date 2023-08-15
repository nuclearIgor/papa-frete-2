import {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { fetchFrete } from "./requests.js";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import EditFrete from "./EditFrete.jsx";
import LoadingScreen from "../../../components/Loading.jsx";
import CandidaturasPendentes from "./CandidaturasPendentes.jsx";
import CandidaturasAceitas from "./CandidaturasAceitas.jsx";
const TomadorFretePage = ( ) => {

    const [pageState, setPageState] = useState('pendentes')

    const { freteId } = useParams()
    const { token } = useContext(AuthContext)

    const { data, isLoading } = useQuery({
        queryKey: ['tomador-frete'],
        queryFn: async () => await fetchFrete(freteId, token)

    })

    if (isLoading) return <LoadingScreen />

    const candidaturasPendentes = data?.frete?.Candidatura.filter(candidatura => candidatura.aceita === null)
    const candidaturasAceitas = data?.frete?.Candidatura.filter(candidatura => candidatura.aceita)

    return (
        <div>
            <div className={'flex w-10/12 mt-2 pb-4 bg-base-100  mx-auto'}>
                <div
                    onClick={() => setPageState('aceitas')}
                    className={`basis-1/6 p-5 shadow-lg mx-2 rounded-md cursor-pointer hover:opacity-50
                    ${pageState === 'aceitas' ? 'border-b-2 bg-papaYellow shadow-sm' : '' }
                    `}
                >
                    Candidaturas aceitas ({candidaturasAceitas.length})
                </div>

                <div
                    onClick={() => setPageState('pendentes')}
                    className={`basis-1/6 p-5  shadow-lg rounded-md cursor-pointer hover:opacity-50
                    ${pageState === 'pendentes' ? 'border-b-2 bg-papaYellow shadow-sm' : '' }
                    `}
                >
                    Candidaturas pendentes ({candidaturasPendentes.length})
                </div>

                <div className={'flex-1 flex justify-end'}>
                    <div
                        onClick={() => setPageState('edit')}
                        className={`text-right p-5 shadow-lg rounded-md cursor-pointer hover:opacity-50
                        ${pageState === 'edit' ? 'border-b-2 bg-papaYellow shadow-sm' : '' }
                        `}
                    >
                        ver ou editar frete
                    </div>
                </div>
            </div>


                {pageState === 'edit' ?
                    <EditFrete frete={data?.frete}/>
                    : null
                }
                {pageState === 'pendentes' ?
                    <CandidaturasPendentes candidaturas={candidaturasPendentes}/>
                    : null
                }
                {pageState === 'aceitas' ?
                    <CandidaturasAceitas candidaturas={candidaturasAceitas}/>
                    : null
                }
        </div>
    );
};

export default TomadorFretePage;