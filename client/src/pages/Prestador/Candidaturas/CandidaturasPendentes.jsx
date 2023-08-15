import CandidaturaCard from "./CandidaturaCard.jsx";

const CandidaturasPendentes = ({candidaturas}) => {

    if (candidaturas.length === 0) {
        return (
            <div>
                <h3>nao existem candidaturas pendentes</h3>
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
                        <div>
                            <span className={'badge badge-info w-24 h-10 font-semibold'}>pendente</span>
                        </div>
                    }
                />)}
        </div>
    );
};

export default CandidaturasPendentes;