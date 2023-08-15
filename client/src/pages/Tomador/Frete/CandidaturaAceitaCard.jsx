import React from 'react';
import {RxAvatar} from "react-icons/rx";
import {BsHandThumbsDown} from "react-icons/bs";
import AceitarCandidaturaModal from "./AceitarCandidaturaModal.jsx";

const CandidaturaAceitaCard = ({candidatura}) => {
    return (
        <div className={'flex w-10/12 mx-auto border border-gray-300 rounded-sm items-center my-2'}>

            <div className={'flex items-center p-4 basis-1/3'}>
                <RxAvatar className={'h-16 w-16 mr-2'}/>
                <p className={'font-bold text-2xl'}>{candidatura.Prestador.nome}</p>
            </div>

            <div className={'flex gap-1 items-center p-4 basis-1/3'}>
                <p className={'font-light'}>Tipo de veiculo:</p>
                <p className={'font-bold'}>
                    {candidatura.Prestador.tipoDoVeiculo}/{candidatura.Prestador.tipoDaCarroceria}</p>
            </div>

            <div className={'basis-1/3 flex gap-1 p-4'}>
                <p>Aceita em:</p>
                <p>{new Date(candidatura.aceitaEm).toLocaleString('pt-BR').slice(0, 10)}</p>
            </div>
        </div>
    );
};

export default CandidaturaAceitaCard;