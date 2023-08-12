import React from 'react';
import {Link} from "react-router-dom";

const TomadorLinks = ({pathname}) => {
    return (
        <>
            <li>
                <Link to={'/novo-frete'}>
                    <div
                        className={`
                                ${pathname === '/novo-frete' ? 'bg-white' : ''}
                                rounded-2xl p-2 `}
                    >
                        Publicar um frete
                    </div>
                </Link>
            </li>
            <li>
                <Link to={'/meus-fretes'}>
                    <div
                        className={`
                            ${pathname === '/meus-fretes' ? 'bg-white' : ''}
                            `}
                    >
                        Meus fretes
                    </div>
                </Link>
            </li>
        </>
    );
};

export default TomadorLinks;