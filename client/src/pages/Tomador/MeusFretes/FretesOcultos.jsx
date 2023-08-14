import React from 'react';
import MeuFreteCard from "./MeuFreteCard.jsx";

const FretesOcultos = ({ fretes }) => {
    return (
        <>
            <div className={''}>
                {fretes?.map(frete => <MeuFreteCard key={frete.id} frete={frete}/>)}
            </div>
        </>
    );
};

export default FretesOcultos;