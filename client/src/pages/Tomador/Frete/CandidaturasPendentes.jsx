import React from 'react';
import CandidaturaPendenteCard from "./CandidaturaPendenteCard.jsx";

const CandidaturasPendentes = ({candidaturas}) => {
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