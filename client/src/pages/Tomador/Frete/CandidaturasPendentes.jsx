import React from 'react';
import CandidaturaPendenteCard from "./CandidaturaPendenteCard.jsx";

const CandidaturasPendentes = ({candidaturas}) => {

    if (candidaturas.length === 0 ) {
        return <div>
            nao existem candidaturas pendentes pra este frete
        </div>
    }

    return (
        <div>
            {candidaturas.map(c =>
                <CandidaturaPendenteCard
                    candidatura={c}
                    key={c.id}
                />)
            }
        </div>
    );
};

export default CandidaturasPendentes;