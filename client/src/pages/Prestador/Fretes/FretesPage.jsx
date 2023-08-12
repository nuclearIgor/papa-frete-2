import FreteCard from "./FreteCard.jsx";
import Filtros from "./Filtros.jsx";
import {useEffect} from "react";
import Cookie from "universal-cookie/es6";

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

    useEffect(() => {
        const userData = cookies.get('userData')
        console.log(userData)
    }, [])

    return (
        <div className={'flex p-6 gap-2'}>
            <div className={'basis-3/12'}>
                <Filtros/>
            </div>

            <div className={'basis-9/12'}>
                {fretes.map((frete, i) => <FreteCard key={`${frete.id}${i}`} frete={frete}/>)}
            </div>
        </div>
    );
};

export default FretesPage;