import React, {useContext, useEffect, useState} from 'react';
import {RxAvatar} from "react-icons/rx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext/AuthContextProvider.jsx";
import PrestadorLinks from "./PrestadorLinks.jsx";
import TomadorLinks from "./TomadorLinks.jsx";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";

const MyNavbar = () => {
    const { pathname } = useLocation()

    const { userData, handleLogout, handleReload } = useContext(AuthContext)

    const [isOpenMenu, setIsOpenMenu ] = useState(false)

    useEffect(() => {
        handleReload()
        console.log(pathname)
    }, [pathname])

    return (
        <>
            <div className="flex items-center bg-papaYellow h-20">
                <div className="basis-1/4 md:basis-1/3 lg:basis-1/2">
                    {/*<a className="btn btn-ghost normal-case text-xl">daisyUI</a>*/}
                    <div className={'basis-1/2 flex items-center lg:pl-8'}>
                        <img src="/black_icon_transparent_background.png" alt="logo" className={'h-16 w-24'}/>
                        <img src="/papa-frete1.svg" alt="" className={'h-16 w-56 hidden md:block'}/>
                    </div>
                </div>
                <div className="flex-1 basis-1/2 justify-end">
                    <ul className="px-1 flex items-center justify-end gap-4">
                        {userData?.tipoDeConta === 'prestador' ?
                            <PrestadorLinks pathname={pathname}/>
                            :
                            userData?.tipoDeConta === 'tomador' ?
                                <TomadorLinks pathname={pathname}/>
                                : null
                        }

                        <li className={''}>
                            <div
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
                                className={'flex items-center gap-1 mx-2 h-full relative bg-base-100 rounded-box'}
                            >
                                <RxAvatar className={'h-full w-16'}/>
                                {isOpenMenu ? <BiSolidUpArrow/> : <BiSolidDownArrow/>}
                            </div>

                            <div>
                                {isOpenMenu ?
                                    <ul className="p-2 bg-papaYellow rounded-box absolute right-1 border border-papaBlue">
                                        <li className={'py-4 px-1'}>
                                            <Link to={`/${userData?.tipoDeConta}/editar-perfil`}
                                                className={'bg-base-100 rounded-2xl p-2 text-sm lg:text-base line-clamp-2 md:line-clamp-1 text-center'}
                                            >
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
                                    : null
                                }
                            </div>
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

export default MyNavbar;