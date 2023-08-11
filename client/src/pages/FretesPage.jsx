import FreteCard from "./FreteCard.jsx";

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
        ufDestino: "PR",
        cidadeDestino: "Curitiba",
        tipoDeCarga: "seca",
        observacoes: "precisa lona",
        veiculoAlvo: "truck",
        carroceriaAlvo: "bau"
    }
]

const FretesPage = () => {
    return (
        <div className={'flex p-6 gap-2'}>
            <div className={'basis-3/12'}>
                <h5 >filte por preferencias</h5>
            </div>

            <div className={'basis-9/12'}>
                {fretes.map(frete => <FreteCard frete={frete}/>)}
            </div>
        </div>
    );
};

export default FretesPage;