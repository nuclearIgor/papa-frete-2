import React from 'react';
import {AiOutlineEye} from "react-icons/ai";
import {RxAvatar} from "react-icons/rx";

const FreteCard = ({frete}) => {
    return (
        <div className={'flex py-4 m-4 rounded-md border border-gray-300'}>
            <div className={'basis-3/12'}>
                <RxAvatar className={'w-full h-full'}/>
            </div>

            <div className={'basis-5/12 flex flex-col gap-4'}>
                <h5 className={'text-left px-2'}>Nome fantasia</h5>

                <div className={'flex justify-between px-2'}>
                    <div>
                        <p>local de partida</p>
                        <p>{frete.cidadeOrigem}-{frete.ufOrigem}</p>
                    </div>

                    <div>
                        <p>local de chegada</p>
                        <p>{frete.cidadeDestino}-{frete.ufDestino}</p>
                    </div>
                </div>

                <div className={'flex justify-between px-2'}>
                    <div>
                        <p>Data de coleta</p>
                        <p>{frete.coleta}</p>
                    </div>

                    <div>
                        <p>Data de entrega</p>
                        <p>{frete.entrega}</p>
                    </div>
                </div>
            </div>

            <div className={'basis-3/12 flex flex-col items-center justify-between'}>
                <div>
                    <p className={'pb-2'}>Oferece:</p>
                    {frete.oferece.split(',').map(item =>
                        <p key={item}>{item}</p>)
                    }
                </div>
                <button className={'flex items-center bg-papaYellow rounded-lg btn'}>Visualizar <AiOutlineEye/></button>
            </div>

        </div>
    );
};

export default FreteCard;