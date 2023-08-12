import {Link, Outlet, useLocation} from 'react-router-dom';

const PublicNavBar = () => {
    const location = useLocation()

    return (
        <>
            <div className="navbar bg-base-100 border-b-1 border-gray-300 shadow-md">
                <div className={'w-3/6 mx-auto'}>
                    <div className="flex-1">
                        <Link to={'/'} className={'btn btn-ghost'}>
                            <img
                                src="/customcolor_icon_transparent_background.png"
                                alt="logo"
                                className={'h-10 w-15'}
                            />
                        </Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li className={
                                `${location.pathname === '/login' ? 'bg-papaBlue text-white' : ''}
                                rounded-2xl p-2`}
                            >
                                <Link to={'/login'}>Login</Link>
                            </li>
                            <li
                                className={
                                `${location.pathname === '/cadastro' ? 'bg-papaBlue text-white' : ''}
                                rounded-2xl p-2`}
                            >
                                <Link to={'/cadastro'}>Cadastro</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    );
};

export default PublicNavBar;
