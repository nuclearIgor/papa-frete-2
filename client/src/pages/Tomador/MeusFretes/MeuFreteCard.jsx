import React from 'react';
import {RxAvatar} from "react-icons/rx";
import {AiOutlineCheck, AiOutlineEye} from "react-icons/ai";
import {BsInfoCircleFill, BsTruck} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const MeuFreteCard = ({frete}) => {

    const {
        Candidatura,
        ufOrigem,
        cidadeOrigem,
        ufDestino,
        cidadeDestino,
        coleta,
        janelaColeta,
        entrega,
        janelaEntrega,
        veiculoAlvo,
        carroceriaAlvo,
        oferecePedagio,
        oferecePernoite,
        ofereceCarga,
        ofereceDescarga,
        reaisPorKm,
    } = frete

    const navigate = useNavigate()

    return (
        <div className={'w-[800px] mx-auto'}>
            <div className={'flex py-4 m-4 rounded-md border border-gray-300'}>

                <div className={'basis-7/12 flex flex-col gap-4'}>
                    <h5 className={'text-center px-2'}>Apelido do frete</h5>

                    <div className={'flex justify-around px-2'}>
                        <div>
                            <p className={'font-bold'}>local de partida</p>
                            <p>{cidadeOrigem}-{ufOrigem}</p>
                        </div>

                        <div>
                            <p className={'font-bold'}>local de chegada</p>
                            <p>{cidadeDestino}-{ufDestino}</p>
                        </div>
                    </div>

                    <div className={'flex justify-around px-2'}>
                        <div>
                            <p className={'font-bold'}>Data de coleta</p>
                            {coleta === 'janela' ?
                                <p>{janelaColeta}</p>
                                :
                                <p>{frete.coleta}</p>
                            }
                        </div>

                        <div>
                            <p className={'font-bold'}>Data de entrega</p>
                            {entrega === 'janela' ?
                                <p>{janelaEntrega}</p>
                                :
                                <p>{frete.entrega}</p>
                            }
                        </div>
                    </div>
                </div>

                <div className={'basis-5/12 flex flex-col items-center justify-between'}>
                    <div className={'px-2 flex flex-col items-center gap-2 font-bold'}>
                        <p className={''}>Candidaturas</p>
                        <div
                            className={'rounded-full flex justify-center items-center h-12 w-12 bg-papaYellow'}
                        >
                            {Candidatura?.length}
                        </div>
                    </div>

                    {/*{veiculoAlvo === userData?.tipoDoVeiculo && carroceriaAlvo === userData?.tipoDaCarroceria ?*/}
                    {/*    <div className={'h-12 flex items-center'}>*/}
                    {/*        <BsTruck className={'w-full h-full text-green-700'}/>*/}
                    {/*        <span*/}
                    {/*            className="tooltip rounded-full w-6 h-6 inline-block pl-2"*/}
                    {/*            data-tip="seu veiculo e preferencial nesse frete">*/}
                    {/*        <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>*/}
                    {/*    </span>*/}
                    {/*    </div>*/}
                    {/*    : null*/}
                    {/*}*/}

                    <button
                        className={'flex items-center bg-papaBlue text-white rounded-lg btn'}
                        onClick={() => navigate(`/meus-fretes/${frete.id}`, {state: {frete}})}
                    >
                        Visualizar <AiOutlineEye/>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MeuFreteCard;