import React from 'react';
import {Link} from "react-router-dom";

const PrestadorLinks = ({pathname}) => {
    return (
        <>
            <li>
                <Link to={'/fretes'}>
                    <div
                        className={`
                                ${pathname === '/fretes' ? 'bg-white' : ''}
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
                            ${pathname === '/candidaturas' ? 'bg-white' : ''}
                            `}
                    >
                        Candidaturas
                    </div>
                </Link>
            </li>
        </>
    );
};

export default PrestadorLinks;