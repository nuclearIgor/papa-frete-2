import React from 'react';
import {RxAvatar} from "react-icons/rx";
import {BsHandThumbsDown, BsWhatsapp} from "react-icons/bs";
import AceitarCandidaturaModal from "./AceitarCandidaturaModal.jsx";

const CandidaturaAceitaCard = ({candidatura}) => {
    console.log(candidatura)
    return (
        <div className={'border w-10/12 mx-auto border-gray-300 rounded-sm'}>
            <div className={'flex w-10/12 mx-auto items-center my-2'}>

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
            <details className={'w-10/12 mx-auto'}>
                <summary className={'p-4'}>ver mais</summary>
                <div className={'w-full flex justify-between h-screen gap-4'}>
                    <div className={'basis-1/4'}>
                        <h4 className={'font-bold'}>endereco</h4>
                        <p>rua: {candidatura.Prestador.rua}</p>
                        <p>numero: {candidatura.Prestador.numero}</p>
                        <p>complemento: {candidatura.Prestador.complemento ? candidatura.Prestador.complemento : 'nao possui'}</p>
                        <p>cep: {candidatura.Prestador.cep}</p>
                        <p>bairro: {candidatura.Prestador.bairro}</p>
                        <p>cidade: {candidatura.Prestador.cidade}</p>
                        <p>estado: {candidatura.Prestador.estado}</p>
                    </div>

                    <div className={'basis-1/4'}>
                        <h4 className={'font-bold'}>veiculo</h4>
                        <p>veiculo: {candidatura.Prestador.tipoDoVeiculo}</p>
                        <p>carroceria: {candidatura.Prestador.tipoDaCarroceria}</p>
                        <p>ano: {candidatura.Prestador.anoDeFabricacaoDoVeiculo}</p>
                        <p>placa: {candidatura.Prestador.placaDoVeiculo}</p>
                        <p>antt: {candidatura.Prestador.anttDoVeiculo}</p>
                    </div>

                    <div className={'basis-2/4'}>
                        <div>
                            <h2 className={'text-3xl text-center flex items-center justify-center'}>
                                <BsWhatsapp className={'text-green-600 mr-2'}/>
                                ({candidatura.Prestador.ddd}) {candidatura.Prestador.telefone}
                            </h2>
                            <p className={'text-center mt-4'}>CNH: {candidatura.Prestador.cnh}</p>
                            <p className={'text-center'}>Categoria: {candidatura.Prestador.categoriaCNH}</p>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    );
};

export default CandidaturaAceitaCard;