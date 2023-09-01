import FreteCard from "./FreteCard.jsx";
import Filtros from "./Filtros.jsx";
import {useContext, useEffect, useState} from "react";
import Cookie from "universal-cookie/es6";
import {useQuery} from "@tanstack/react-query";
import {fetchFretes} from "./requests.js";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import LoadingScreen from "../../../components/Loading.jsx";

const fretes = [
    {
        id: "ea3eefab-3fe8-4acb-8e9e-97d8368cd9a5",
        createdAt: "2023-08-10T18:00:37.819Z",
        updatedAt: "2023-08-10T18:00:37.819Z",
        tomadorId: "2ed3b028-eecf-48d5-822c-5278c4636ad2",
        coleta: "livre",
        entrega: "sem agenda",
        oferece: "pernoite,descarga",
        ufOrigem: "PR",
        cidadeOrigem: "Curitiba",
        ufDestino: "PR",
        cidadeDestino: "Curitiba",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    },
    {
        id: "ea3eefab-3fe8-4acb-8e9e-97d8368cd9a5",
        createdAt: "2023-08-10T18:00:37.819Z",
        updatedAt: "2023-08-10T18:00:37.819Z",
        tomadorId: "2ed3b028-eecf-48d5-822c-5278c4636ad2",
        coleta: "livre",
        entrega: "sem agenda",
        oferece: "pernoite,descarga",
        ufOrigem: "PR",
        cidadeOrigem: "Curitiba",
        ufDestino: "PR",
        cidadeDestino: "Curitiba",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    },
    {
        id: "ea3eefab-3fe8-4acb-8e9e-97d8368cd9a5",
        createdAt: "2023-08-10T18:00:37.819Z",
        updatedAt: "2023-08-10T18:00:37.819Z",
        tomadorId: "2ed3b028-eecf-48d5-822c-5278c4636ad2",
        coleta: "livre",
        entrega: "sem agenda",
        oferece: "pernoite,descarga",
        ufOrigem: "PR",
        cidadeOrigem: "Curitiba",
        ufDestino: "PR",
        cidadeDestino: "Curitiba",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    },
    {
        id: "ea3eefab-3fe8-4acb-8e9e-97d8368cd9a5",
        createdAt: "2023-08-10T18:00:37.819Z",
        updatedAt: "2023-08-10T18:00:37.819Z",
        tomadorId: "2ed3b028-eecf-48d5-822c-5278c4636ad2",
        coleta: "livre",
        entrega: "sem agenda",
        oferece: "pernoite,descarga",
        ufOrigem: "PR",
        cidadeOrigem: "Curitiba",
        ufDestino: "PR",
        cidadeDestino: "Curitiba",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    },
    {
        id: "ea3eefab-3fe8-4acb-8e9e-97d8368cd9a5",
        createdAt: "2023-08-10T18:00:37.819Z",
        updatedAt: "2023-08-10T18:00:37.819Z",
        tomadorId: "2ed3b028-eecf-48d5-822c-5278c4636ad2",
        coleta: "livre",
        entrega: "sem agenda",
        oferece: "pernoite,descarga",
        ufOrigem: "PR",
        cidadeOrigem: "Curitiba",
        ufDestino: "PR",
        cidadeDestino: "Curitiba",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    },
    {
        id: "ea3eefab-3fe8-4acb-8e9e-97d8368cd9a5",
        createdAt: "2023-08-10T18:00:37.819Z",
        updatedAt: "2023-08-10T18:00:37.819Z",
        tomadorId: "2ed3b028-eecf-48d5-822c-5278c4636ad2",
        coleta: "livre",
        entrega: "sem agenda",
        oferece: "pernoite,descarga",
        ufOrigem: "PR",
        cidadeOrigem: "Curitiba",
        ufDestino: "SP",
        cidadeDestino: "Franca",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    }
]
const cookies = new Cookie();

const FretesPage = () => {
    const [freteFilters, setFreteFilters] = useState({})

    const { token } = useContext(AuthContext)

    const  query  = useQuery({
        queryKey: ['fretes'],
        queryFn: () => fetchFretes(freteFilters, token)
    })

    // useEffect(() => {
    //     console.log('data:', data)
    // }, [data])


    const onSubmitFiltros = (values) => {
        setFreteFilters(values)
        console.log(values)
        setTimeout(async () => {
            await query.refetch()
            // setFreteFilters({})

        }, 100)
    }

    if ( query?.isLoading ) return <LoadingScreen/>

    return (
        <div className={'flex p-6 gap-2 bg-base-100'}>
            <div className={'basis-3/12 hidden lg:block lg:w-96'}>
                <Filtros onSubmit={onSubmitFiltros}/>
            </div>

            <div className={'basis-9/12 flex-1 flex flex-col items-center'}>

                    {query.data.fretes.length > 0 ?
                        query?.data?.fretes.map(frete => <FreteCard key={frete.id} frete={frete}/>)
                        :
                        <div className={'font-semibold text-xl text-center pt-10'}>Nao houveram resultados para essa busca</div>
                    }

            </div>
        </div>
    );
};

export default FretesPage;