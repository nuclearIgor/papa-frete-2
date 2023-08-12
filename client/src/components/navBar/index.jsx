import React, {useContext} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {RxAvatar} from "react-icons/rx";
import {AuthContext} from "../../contexts/AuthContext/AuthContextProvider.jsx";
import Daisynav from "./daisynav.jsx";

const PrestadorNavBar = () => {

    const location = useLocation()

    const { handleLogout } = useContext(AuthContext)

    return (
        <>
            <div className={'w-full bg-papaYellow h-20 flex'}>
                <div className={'basis-1/2 flex items-center pl-8'}>
                    <img src="/black_icon_transparent_background.png" alt="logo" className={'h-16 w-24'}/>
                    <img src="/papa-frete1.svg" alt="" className={'h-16 w-56'}/>
                </div>
                <div className={'basis-1/2 flex justify-around items-center'}>
                    <ul className={'menu menu-horizontal'}>
                        <li>
                            <Link to={'/fretes'}>
                                <div
                                    className={`
                            ${location.pathname === '/fretes' ? 'bg-white' : ''}
                            rounded-2xl p-2 `}
                                >
                                    Encontre um frete
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/candidaturas'}>
                                <div
                                    className={`
                            ${location.pathname === '/candidaturas' ? 'bg-white' : ''}
                            `}
                                >
                                    Candidaturas
                                </div>
                            </Link>
                        </li>
                    </ul>

                    <details className="">
                        <summary className="">
                            {/*<RxAvatar className={'h-32 w-16'}/>*/}
                            parent
                        </summary>
                        <div className="">
                            <ul>
                                <li onClick={handleLogout}>logout</li>
                                <li>item</li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>
            {/*<div>*/}
            {/*    <Daisynav/>*/}
            {/*</div>*/}
            <div>
                <Outlet/>
            </div>
        </>
    );
};

export default PrestadorNavBar