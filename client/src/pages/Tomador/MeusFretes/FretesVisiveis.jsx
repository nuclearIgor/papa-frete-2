import MeuFreteCard from "./MeuFreteCard.jsx";

const FretesVisiveis = ({fretes}) => {
    return (
        <>
            <div className={''}>
                {fretes?.map(frete => <MeuFreteCard key={frete.id} frete={frete}/>)}
            </div>
        </>
    );
};

export default FretesVisiveis;