import CandidaturaCard from "./CandidaturaCard.jsx";

const CandidaturasAceitas = ({candidaturas}) => {

    if (candidaturas.length === 0) {
        return (
            <div>
                <h3>nao existem candidaturas aprovadas</h3>
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
                            <span className={'badge badge-success w-24 h-10 font-semibold'}>aceita</span>
                            <p>aceita em:
                                <span className={'ml-1'}>
                                    {new Date(candidatura.aceitaEm).toLocaleString('pt-BR').slice(0, 10)}
                                </span>
                            </p>
                            <p className={'font-light'}>Aguarde o tomador do frete entrar em contato</p>
                        </div>
                    }
                />)}
        </div>
    );
};

export default CandidaturasAceitas;