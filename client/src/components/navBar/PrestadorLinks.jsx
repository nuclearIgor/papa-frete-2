import React from 'react';
import {Link} from "react-router-dom";

const PrestadorLinks = ({pathname}) => {
    console.log(pathname === '/fretes')
    return (
        <>
            <li>
                <Link to={'/fretes'}
                      className={`${pathname === '/fretes' ? 'bg-white' : ''}
                        rounded-2xl p-2 text-sm lg:text-base line-clamp-2 md:line-clamp-1 text-center`}
                >
                        Encontre um frete
                </Link>
            </li>
            <li>
                <Link to={'/minhas-candidaturas'}
                      className={`${pathname === '/minhas-candidaturas' ? 'bg-white' : ''}
                        rounded-2xl p-2 text-sm lg:text-base`}>
                        Candidaturas
                </Link>
            </li>
        </>
    );
};

export default PrestadorLinks;