import CandidaturaCard from "./CandidaturaCard.jsx";

const CandidaturasRecusadas = ({candidaturas}) => {

    if (candidaturas.length === 0) {
        return (
            <div>
                <h3>nao existem candidaturas recusadas</h3>
            </div>
        )
    }

    return (
        <div>
            {candidaturas.map(candidatura =>
                <CandidaturaCard
                    frete={candidatura.Frete}
                    key={candidatura.id}
                    children={
                        <div className={'flex flex-col justify-center items-center'}>
                            <span className={'badge badge-error w-24 h-10 font-semibold'}>recusada</span>
                            <p>recusada em:
                                <span className={'ml-1'}>
                                    {new Date(candidatura.aceitaEm).toLocaleString('pt-BR').slice(0, 10)}
                                </span>
                            </p>
                            <p className={'font-light'}>Voce nao pode se recandidatar</p>
                        </div>
                    }
                />)}
        </div>
    );
};

export default CandidaturasRecusadas;