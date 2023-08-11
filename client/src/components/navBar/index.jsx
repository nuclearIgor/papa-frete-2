import React from 'react';
import {Link} from "react-router-dom";
import {RxAvatar} from "react-icons/rx";

const PrestadorNavBar = () => {
    return (
        <div className={'w-full bg-papaYellow h-20 flex'}>
            <div className={'basis-1/2 flex items-center pl-8'}>
                <img src="/black_icon_transparent_background.png" alt="logo" className={'h-16 w-24'}/>
                <img src="/papa-frete1.svg" alt="" className={'h-16 w-56'}/>
            </div>
            <div className={'basis-1/2 flex justify-around items-center'}>
                <Link to={'/fretes'}>
                    <div>Encontre um frete</div>
                </Link>
                <Link to={'/candidaturas'}>
                    <div>Candidaturas</div>
                </Link>

                <details className="">
                    <summary className="">
                        <RxAvatar className={'h-32 w-16'}/>
                    </summary>
                    <div className="">
                        <ul>
                            <li>item</li>
                            <li>item</li>
                        </ul>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default PrestadorNavBar