import { ESTADOS } from "../../../../util/cidades.js";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
    ufOrigem: 'estado',
    cidadeOrigem: 'cidade',
    cidadeDestino: 'cidade',
    ufDestino: 'estado',
    startDate: new Date(),
    dataColetaCheckbox: false,
    coletaLivre: false,
    // pedagio: false,
    // pernoite: false,
    // carga: false,
    // descarga: false,
}

const Filtros = ({onSubmit}) => {

    const [filtrosState, setFiltrosState] = useState({
        ...initialState
    })

    const handleSubmit = () => {
        onSubmit(filtrosState)
    }

    const limparFiltros = () => {
        setFiltrosState({...initialState})
        setTimeout(() => {
            onSubmit(initialState)
        }, 100)
    }

    return (
        <div className={'border w-full h-fit m-4 rounded-md overflow-scroll'}>
            <h5 className={'bg-papaBlue rounded-md text-white w-full h-12 text-center flex items-center justify-center'}
            >filte por preferencias</h5>

            <div className={'flex flex-col gap-2 w-4/5 mx-auto mb-10 mt-4'}>
                <label className="label">
                    <span className="label-text font-bold">Origem</span>
                </label>
                <select
                    onChange={e => setFiltrosState((prevState) => {
                        return {
                            ...prevState,
                            ufOrigem: e.target.value,
                        }
                    })}
                    name="ufOrigem"
                    id="ufOrigem"
                    defaultValue={'estado'}
                    value={filtrosState.ufOrigem}
                    className={'select select-bordered'}
                >
                    <option value="estado" disabled>Estado</option>
                    {Object.keys(ESTADOS).map(uf =>
                        <option value={uf} key={uf}>{uf}</option>)}
                </select>

                <select
                    name="cidadeOrigem"
                    id="cidadeOrigem"
                    defaultValue={filtrosState.cidadeOrigem}
                    className={'select select-bordered'}
                    onChange={e => setFiltrosState((prevState) => {
                        return {
                            ...prevState,
                            cidadeOrigem: e.target.value,
                        }
                    })}
                    value={filtrosState.cidadeOrigem}
                >
                    <option value="cidade" disabled>Cidade</option>
                    {filtrosState.ufOrigem !== 'estado' && ESTADOS[`${filtrosState.ufOrigem}`].map(item =>
                        <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                </select>
            </div>

            <div className={'flex flex-col gap-2 w-4/5 mx-auto mb-10'}>
                <label className="label">
                    <span className="label-text font-bold">Destino</span>
                </label>
                <select
                    onChange={e => setFiltrosState((prevState) => {
                        return {
                            ...prevState,
                            ufDestino: e.target.value,
                        }
                    })}
                    value={filtrosState.ufDestino}
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
                    onChange={e => setFiltrosState((prevState) => {
                        return {
                            ...prevState,
                            cidadeDestino: e.target.value,
                        }
                    })}
                    value={filtrosState.cidadeDestino}
                >
                    <option value="cidade" disabled>Cidade</option>
                    {filtrosState.ufDestino !== 'estado' && ESTADOS[`${filtrosState.ufDestino}`].map(item =>
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
                        name={'dataColetaCheckbox'}
                        checked={filtrosState.dataColetaCheckbox}
                        onChange={e => setFiltrosState((prevState) => {
                            return {
                                ...prevState,
                                dataColetaCheckbox: e.target.checked,
                            }
                        })}
                        // onChange={(e) =>
                        //     setDataColetaCheckbox(e.target.checked)
                        // }
                    />
                    <DatePicker
                        dateFormat={'dd/MM/yyyy'}
                        disabled={!filtrosState.dataColetaCheckbox}
                        selected={filtrosState.startDate}
                        // onChange={(date) => setStartDate(date)}
                        onChange={date => setFiltrosState((prevState) => {
                            console.log(date)
                            return {
                                ...prevState,
                                startDate: date,
                            }
                        })}
                        className={`w-3/4 text-center rounded-md ${!filtrosState.dataColetaCheckbox ? 'bg-gray-200' : 'bg-green-200'}`}
                    />
                </div>

                <div className={'flex items-center'}>
                    <input
                        name={'coletalivre'}
                        type="checkbox"
                        className="checkbox mr-4"
                        id={"coletalivre"}
                        checked={filtrosState.coletaLivre}
                        onChange={e => setFiltrosState((prevState) => {
                            return {
                                ...prevState,
                                coletaLivre: e.target.checked,
                            }
                        })}
                    />
                    <p>Coleta Livre</p>
                </div>

                {/*<div className={'flex flex-col items-center'}>*/}
                {/*    <label className="label">*/}
                {/*        <span className="label-text font-bold">Oferece</span>*/}
                {/*    </label>*/}

                {/*    <div className={'flex justify-start w-full mb-2'}>*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="checkbox mr-4"*/}
                {/*            id={"pegadio"}*/}
                {/*            name={"pegadio"}*/}
                {/*            checked={filtrosState.pedagio}*/}
                {/*            onChange={e => setFiltrosState((prevState) => {*/}
                {/*                return {*/}
                {/*                    ...prevState,*/}
                {/*                    pedagio: e.target.checked,*/}
                {/*                }*/}
                {/*            })}*/}
                {/*        />*/}
                {/*        <p>pedagio</p>*/}
                {/*    </div>*/}

                {/*    <div className={'flex justify-start w-full mb-2'}>*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="checkbox mr-4"*/}
                {/*            id={"pernoite"}*/}
                {/*            name={"pernoite"}*/}
                {/*            checked={filtrosState.pernoite}*/}
                {/*            onChange={e => setFiltrosState((prevState) => {*/}
                {/*                return {*/}
                {/*                    ...prevState,*/}
                {/*                    pernoite: e.target.checked,*/}
                {/*                }*/}
                {/*            })}*/}
                {/*        />*/}
                {/*        <p>pernoite</p>*/}
                {/*    </div>*/}

                {/*    <div className={'flex justify-start w-full mb-2'}>*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="checkbox mr-4"*/}
                {/*            id={"carga"}*/}
                {/*            name={"carga"}*/}
                {/*            checked={filtrosState.carga}*/}
                {/*            onChange={e => setFiltrosState((prevState) => {*/}
                {/*                return {*/}
                {/*                    ...prevState,*/}
                {/*                    carga: e.target.checked,*/}
                {/*                }*/}
                {/*            })}*/}
                {/*        />*/}
                {/*        <p>carga</p>*/}
                {/*    </div>*/}

                {/*    <div className={'flex justify-start w-full mb-2'}>*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="checkbox mr-4"*/}
                {/*            id={"descarga"}*/}
                {/*            name={"descarga"}*/}
                {/*            checked={filtrosState.descarga}*/}
                {/*            onChange={e => setFiltrosState((prevState) => {*/}
                {/*                return {*/}
                {/*                    ...prevState,*/}
                {/*                    descarga: e.target.checked,*/}
                {/*                }*/}
                {/*            })}*/}
                {/*        />*/}
                {/*        <p>pedagio</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className={'my-4 flex flex-col items-center gap-2'}>
                <button onClick={handleSubmit} className={'btn w-28 bg-papaYellow'}>Aplicar filtros</button>
                <button onClick={limparFiltros} className={'btn w-28 bg-white border-2 border-papaYellow'}>Limpar filtros</button>
            </div>
        </div>
    );
};

export default Filtros;