import { BsFillBuildingFill } from 'react-icons/bs';
import { RiTruckFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const CadastroPage = () => {
    const navigate = useNavigate();

    const handleRedirect = route => {
        navigate(`${route}`);
    };

    return (
        <div
            className={
                'container h-screen w-full max-w-md flex flex-row justify-center py-12 gap-4 mx-auto full-navbar'
            }
        >
            <div className="card h-72 py-2 w-72 bg-base-100 shadow-xl">
                <figure>
                    <BsFillBuildingFill size={48} />
                </figure>

                <div className="card-body  text-center">
                    <h2 className="text-2xl">Sou Tomador</h2>
                    <p>Quero contratar fretes!</p>
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleRedirect('/cadastro/tomador')}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>

            <div className="card h-72 py-2 w-72 bg-base-100 shadow-xl">
                <figure>
                    <RiTruckFill size={48} />
                </figure>

                <div className="card-body  text-center">
                    <h2 className="text-2xl">Sou prestador</h2>
                    <p>Quero fazer fretes!</p>
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                handleRedirect('/cadastro/prestador')
                            }
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroPage;
