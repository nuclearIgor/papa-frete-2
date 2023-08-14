import React, {useContext} from 'react';
import {AiOutlineCheck, AiOutlineEye} from "react-icons/ai";
import {RxAvatar} from "react-icons/rx";
import {BsInfoCircleFill, BsTruck} from "react-icons/bs";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import {useNavigate} from "react-router-dom";

const FreteCard = ({frete}) => {
    const { userData } = useContext(AuthContext)

    const {
        Tomador,
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
        <div className={'flex py-4 m-4 rounded-md border border-gray-300'}>
            <div className={'basis-3/12'}>
                <RxAvatar className={'w-full h-full'}/>
            </div>

            <div className={'basis-5/12 flex flex-col gap-4'}>
                <h5 className={'text-center px-2'}>Empresa: {Tomador?.nomeFantasia}</h5>

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

            <div className={'basis-3/12 flex flex-col items-center justify-between'}>
                <div className={'px-2'}>
                    <p className={'font-bold mb-2'}>Oferece:</p>

                    <div className={'flex gap-2 flex-wrap'}>
                        {reaisPorKm === 'x' || !frete.reaisPorKm ? null
                            :
                            // <p>
                            //     R$: <span className={'badge badge-success mx-1'}>{frete.reaisPorKm}</span>
                            //     por km,
                            // </p>
                            <span className={'badge badge-success'}>
                                R$ {reaisPorKm}/km
                            </span>
                        }

                        {oferecePernoite ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Pernoite
                            </span> : null
                        }
                        {oferecePedagio ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Pedagio
                            </span> : null
                        }
                        {ofereceCarga ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Carga
                            </span> : null
                        }
                        {ofereceDescarga ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Descarga
                            </span> : null
                        }
                    </div>
                </div>

                {veiculoAlvo === userData?.tipoDoVeiculo && carroceriaAlvo === userData?.tipoDaCarroceria ?
                    <div className={'h-12 flex items-center'}>
                        <BsTruck className={'w-full h-full text-green-700'}/>
                        <span
                            className="tooltip rounded-full w-6 h-6 inline-block pl-2"
                            data-tip="seu veiculo e preferencial nesse frete">
                            <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
                    </div>
                    : null
                }

                <button
                    className={'flex items-center bg-papaYellow rounded-lg btn'}
                    onClick={() => navigate(`/fretes/${frete.id}`)}
                >
                    Visualizar <AiOutlineEye/></button>
            </div>

        </div>
    );
};

export default FreteCard;