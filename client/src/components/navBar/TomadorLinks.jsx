import React from 'react';
import {Link} from "react-router-dom";

const TomadorLinks = ({pathname}) => {
    return (
        <>
            <li>
                <Link to={'/novo-frete'}
                      className={`${pathname === '/novo-frete' ? 'bg-white' : ''}
                        rounded-2xl p-2 text-sm lg:text-base line-clamp-2 md:line-clamp-1 text-center`}
                >
                        Publicar um frete
                </Link>
            </li>
            <li>
                <Link to={'/meus-fretes'}
                      className={`${pathname === '/meus-fretes' ? 'bg-white' : ''}
                        rounded-2xl p-2 text-sm lg:text-base line-clamp-2 md:line-clamp-1 text-center`}
                >
                    Meus fretes
                </Link>
            </li>
        </>
    );
};

export default TomadorLinks;