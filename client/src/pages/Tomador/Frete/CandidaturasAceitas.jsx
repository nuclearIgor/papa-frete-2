import React from 'react';
import CandidaturaAceitaCard from "./CandidaturaAceitaCard.jsx";

const CandidaturasAceitas = ({candidaturas}) => {

    if (candidaturas.length === 0 ) {
        return <div>
            nao existem candidaturas aceitas pra este frete
        </div>
    }

    return (
        <div>
            {candidaturas.map(c =>
                <CandidaturaAceitaCard
                    candidatura={c}
                    key={c.id}
                />)
            }
        </div>
    );
};

export default CandidaturasAceitas;