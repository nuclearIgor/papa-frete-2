import React from 'react';
import CandidaturaAceitaCard from "./CandidaturaPendenteCard.jsx";

const CandidaturasAceitas = ({candidaturas}) => {
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