import { ESTADOS } from "../../../../util/cidades.js";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filtros = () => {
    const [ufOrigem, setUfOrigem] = useState('estado')
    const [ufDestino, setUfDestino] = useState('estado')

    const [startDate, setStartDate] = useState(new Date());
    const [dataColetaCheckbox, setDataColetaCheckbox] = useState(false);
    const [coletaLivre, setColetaLivre] = useState(false);

    const [pedagio, setPedagio] = useState(false)
    const [pernoite, setPernoite] = useState(false)
    const [carga, setCarga] = useState(false)
    const [descarga, setDescarga] = useState(false)

    return (
        <div className={'border h-fit m-4 rounded-md overflow-scroll'}>
            <h5 className={'bg-papaBlue rounded-md text-white w-full h-12 text-center flex items-center justify-center'}
            >filte por preferencias</h5>

            <div className={'flex flex-col gap-2 w-4/5 mx-auto mb-10 mt-4'}>
                <label className="label">
                    <span className="label-text font-bold">Origem</span>
                </label>
                <select
                    onChange={e => setUfOrigem(e.target.value)}
                    name="ufOrigem"
                    id="ufOrigem"
                    defaultValue={'estado'}
                    className={'select select-bordered'}
                >
                    <option value="estado" disabled>Estado</option>
                    {Object.keys(ESTADOS).map(uf =>
                        <option value={uf} key={uf}>{uf}</option>)}
                </select>

                <select
                    name="cidadeOrigem"
                    id="cidadeOrigem"
                    defaultValue={'cidade'}
                    className={'select select-bordered'}
                >
                    <option value="cidade" disabled>Cidade</option>
                    {ufOrigem !== 'estado' && ESTADOS[`${ufOrigem}`].map(item =>
                        <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                </select>
            </div>

            <div className={'flex flex-col gap-2 w-4/5 mx-auto mb-10'}>
                <label className="label">
                    <span className="label-text font-bold">Destino</span>
                </label>
                <select
                    onChange={e => setUfDestino(e.target.value)}
                    name="ufDestino"
                    id="ufDestino"
                    defaultValue={'estado'}
                    className={'select select-bordered'}
                >
                    <option value="estado" disabled>Estado</option>
                    {Object.keys(ESTADOS).map(uf =>
                        <option value={uf} key={uf}>{uf}</option>)}
                </select>

                <select
                    name="cidadeDestino"
                    id="cidadeDestino"
                    defaultValue={'cidade'}
                    className={'select select-bordered'}
                >
                    <option value="cidade" disabled>Cidade</option>
                    {ufDestino !== 'estado' && ESTADOS[`${ufDestino}`].map(item =>
                        <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                </select>
            </div>

            <div className={'flex flex-col gap-2 w-4/5 mx-auto'}>
                <label className="label">
                        <span className="label-text font-bold">Data de Coleta</span>
                </label>
                <div className={'flex items-center mb-2'}>
                    <input
                        type="checkbox"
                        className="checkbox mr-4"
                        id={"dataColetaCheckbox"}
                        name={'coletalivre'}
                        value={dataColetaCheckbox}
                        onChange={(e) =>
                            setDataColetaCheckbox(e.target.checked)
                        }
                    />
                    <DatePicker
                        disabled={!dataColetaCheckbox}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className={`w-3/4 text-center rounded-md ${!dataColetaCheckbox ? 'bg-gray-200' : 'bg-green-200'}`}
                    />
                </div>

                <div className={'flex items-center'}>
                    <input
                        name={'coletalivre'}
                        type="checkbox"
                        className="checkbox mr-4"
                        id={"dataColetaCheckbox"}
                        value={dataColetaCheckbox}
                        onChange={(e) =>
                            setDataColetaCheckbox(e.target.checked)
                        }
                    />
                    <p>Coleta Livre</p>
                </div>

                <div className={'flex flex-col items-center'}>
                    <label className="label">
                        <span className="label-text font-bold">Oferece</span>
                    </label>

                    <div className={'flex justify-start w-full mb-2'}>
                        <input
                            type="checkbox"
                            className="checkbox mr-4"
                            id={"pegadio"}
                            value={pedagio}
                            onChange={(e) =>
                                setPedagio(e.target.checked)
                            }
                        />
                        <p>pedagio</p>
                    </div>

                    <div className={'flex justify-start w-full mb-2'}>
                        <input
                            type="checkbox"
                            className="checkbox mr-4"
                            id={"pernoite"}
                            value={pernoite}
                            onChange={(e) =>
                                setPernoite(e.target.checked)
                            }
                        />
                        <p>pernoite</p>
                    </div>

                    <div className={'flex justify-start w-full mb-2'}>
                        <input
                            type="checkbox"
                            className="checkbox mr-4"
                            id={"carga"}
                            value={carga}
                            onChange={(e) =>
                                setCarga(e.target.checked)
                            }
                        />
                        <p>carga</p>
                    </div>

                    <div className={'flex justify-start w-full mb-2'}>
                        <input
                            type="checkbox"
                            className="checkbox mr-4"
                            id={"descarga"}
                            value={descarga}
                            onChange={(e) =>
                                setDescarga(e.target.checked)
                            }
                        />
                        <p>pedagio</p>
                    </div>
                </div>
            </div>

            <div className={'my-4 flex flex-col items-center gap-2'}>
                <button className={'btn w-28 bg-papaYellow'}>Aplicar filtros</button>
                <button className={'btn w-28 bg-white border-2 border-papaYellow'}>Limpar filtros</button>
            </div>
        </div>
    );
};

export default Filtros;