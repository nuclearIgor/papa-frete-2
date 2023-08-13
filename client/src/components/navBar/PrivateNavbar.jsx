import React, {useContext, useEffect} from 'react';
import {RxAvatar} from "react-icons/rx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext/AuthContextProvider.jsx";
import PrestadorLinks from "./PrestadorLinks.jsx";
import TomadorLinks from "./TomadorLinks.jsx";

const PrivateNavbar = () => {
    const { pathname } = useLocation()

    const { userData, handleLogout, handleReload } = useContext(AuthContext)

    useEffect(() => {
        handleReload()
    }, [])

    return (
        <>
            <div className="navbar bg-papaYellow h-20">
                <div className="basis-1/2">
                    {/*<a className="btn btn-ghost normal-case text-xl">daisyUI</a>*/}
                    <div className={'basis-1/2 flex items-center pl-8'}>
                        <img src="/black_icon_transparent_background.png" alt="logo" className={'h-16 w-24'}/>
                        <img src="/papa-frete1.svg" alt="" className={'h-16 w-56'}/>
                    </div>
                </div>
                <div className="flex-none basis-1/2 justify-around">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        {userData?.tipoDeConta === 'prestador' ?
                        <PrestadorLinks pathname={pathname}/>
                            :
                            userData?.tipoDeConta === 'tomador' ?
                                <TomadorLinks pathname={pathname}/>
                                : null
                        }
                        <li>
                            <details>
                                <summary>
                                    <RxAvatar className={'h-full w-16'}/>
                                </summary>
                                <ul className="p-2 bg-base-100">
                                    <li>
                                        <Link to={'/perfil'}>
                                            <div>
                                                Editar perfil
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className={'btn'}
                                            onClick={handleLogout}
                                        >
                                            logout
                                        </button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    );
};

export default PrivateNavbar;