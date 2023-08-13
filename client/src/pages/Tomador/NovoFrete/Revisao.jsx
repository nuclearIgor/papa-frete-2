import {AiOutlineCheck} from "react-icons/ai";
import React from "react";

const Revisao = ({ frete, handleBack, onSubmit}) => {
    const {
        ufOrigem,
        cidadeOrigem,
        ufDestino,
        cidadeDestino,

    } = frete

    return (
        <div className={'max-w-xs mx-auto'}>
            <div className={'flex justify-between mb-2'}>
                <div className={'basis-1/2'}>
                    <p className={'font-bold'}>Origem</p>
                    <p>{cidadeOrigem}-{ufOrigem}</p>
                </div>
                <div className={'basis-1/2'}>
                    <p className={'font-bold'}>Destino</p>
                    <p>{cidadeDestino}-{ufDestino}</p>
                </div>
            </div>

            <div className={'flex justify-between mb-2'}>
                <div className={'basis-1/2'}>
                    <p className={'font-bold'}>Coleta</p>
                    {frete.coleta === 'janela' ?
                        <p>{frete.janelaColeta}</p>
                        :
                        <p>{frete.coleta}</p>                    }
                </div>

                <div className={'basis-1/2'}>
                    <p className={'font-bold'}>Entrega</p>
                    {frete.entrega === 'janela' ?
                        <p>{frete.janelaEntrega}</p>
                        :
                        <p>{frete.entrega}</p>                    }
                </div>
            </div>

            <div className={''}>
                <div>
                    <p className={'font-bold'}>Tipo de carga</p>
                    <p>{frete.tipoDeCarga}</p>

                    <div className={''}>
                        <div className={'my-2'}>
                            <p className={'font-bold'}>Veiculo preferencial</p>

                            {frete.veiculoAlvo === 'x' ?
                                <p className={'font-light'}>Indifere</p>
                                :
                                <p>{frete.veiculoAlvo}</p>
                            }
                        </div>

                        <div className={'my-2'}>
                            <p className={'font-bold'}>Carroceria preferencial</p>
                            {frete.carroceriaAlvo === 'x' ?
                                <p className={'font-light'}>Indifere</p>
                                :
                                <p>{frete.carroceriaAlvo}</p>
                            }
                        </div>
                    </div>
                </div>

                <div>
                    <p className={'font-bold mb-2'}>Oferece:</p>

                    <div className={'flex gap-2 flex-wrap'}>
                        {frete.reaisPorKm === 'x' || !frete.reaisPorKm ? null
                        :
                        <p>
                            R$: <span className={'badge badge-success mx-1'}>{frete.reaisPorKm}</span>
                            por km,
                        </p>
                        }

                        {frete.oferecePernoite ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Pernoite
                            </span> : null
                        }
                        {frete.oferecePedagio ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Pedagio
                            </span> : null
                        }
                        {frete.ofereceCarga ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Carga
                            </span> : null
                        }
                        {frete.ofereceDescarga ?
                            <span className={'badge badge-success'}>
                                <AiOutlineCheck/>
                                Descarga
                            </span> : null
                        }
                    </div>
                </div>
            </div>

            <div className={'my-2'}>
                <p className={'font-bold my-2'}>Observacoes:</p>
                <p className={'p-2 rounded-md border border-papaBlue'}>{frete.observacoes}</p>
            </div>

            <div className="flex justify-between gap-8 mt-4">
                <button
                    className={'btn btn-neutral'}
                    onClick={handleBack}
                >
                    Voltar
                </button>
                <button className={'btn btn-primary w-24'} type={'submit'} onClick={onSubmit}>
                        Publicar
                </button>
            </div>
        </div>
    );
};

export default Revisao;