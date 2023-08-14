import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import {brDateToUtc} from "../../../../util/brDateToUtc.js";

const ColetaEntregaForm = ({ handleBack, loading, onSubmit, frete}) => {

    const [coleta, setColeta] = useState(frete.coleta ? frete.coleta : 'livre');
    const [entrega, setEntrega] = useState(frete.entrega ? frete.entrega : 'sem agenda');

    const [coletaStartDate, setColetaStartDate] = useState(frete.coleta === 'janela' ? new Date(brDateToUtc(frete.janelaColeta)) : new Date())
    const [entregaStartDate, setEntregaStartDate] = useState(frete.entrega === 'janela' ? new Date(brDateToUtc(frete.janelaEntrega)) : new Date())

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = {
            coleta,
            janelaColeta: coleta === 'janela' ? coletaStartDate.toLocaleDateString('pt-BR').slice(0, 10) : 'x',
            entrega,
            janelaEntrega: entrega === 'janela' ? entregaStartDate.toLocaleDateString('pt-BR').slice(0, 10) : 'x'
        }

        onSubmit(values)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={'max-w-md mx-auto rounded-box p-10 flex flex-col gap-4 border border-papaYellow'}>
                <div
                    className={'form-control basis-1/2 flex flex-col items-center gap-2'}
                >
                    <label className="label">
                        <span className="label-text font-bold">Coleta</span>
                    </label>

                    <div className={'flex gap-4'}>
                        <select
                            name=""
                            id=""
                            className={'select select-bordered'}
                            defaultValue={coleta}
                            onChange={(e) => setColeta(e.target.value)}
                        >
                            <option value="livre">coleta livre</option>
                            <option value="janela">janela</option>
                        </select>

                        {coleta === 'janela' ? (
                            <DatePicker
                                className={'input text-center w-4/5 h-12 rounded-md bg-green-200 border border-papaBlue'}
                                selected={coletaStartDate}
                                dateFormat={'dd/MM/yyyy'}
                                onChange={(date) => setColetaStartDate(date)}
                            />
                        ) : null}
                    </div>
                </div>

            <div
                className={'basis-1/2 form-control flex flex-col items-center gap-2'}
            >
                <label className="label">
                    <span className="label-text font-bold">Entrega</span>
                </label>

                <div className={'flex gap-4'}>
                    <select
                        name=""
                        id=""
                        defaultValue={entrega}
                        className={'select select-bordered'}
                        onChange={(e) => setEntrega(e.target.value)}
                    >
                        <option value="sem agenda">Sem agenda</option>
                        <option value="janela">janela</option>
                        {[...Array(15).keys()].map((i) => (
                            <option key={i} value={`D+${i + 1}`}>
                                D+{i + 1}
                            </option>
                        ))}
                    </select>

                    {entrega === 'janela' ? (
                        <DatePicker
                            className={'input text-center w-4/5 h-12 rounded-md bg-green-200 border border-papaBlue'}
                            selected={entregaStartDate}
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => setEntregaStartDate(date)}
                        />
                    ) : null}
                </div>
            </div>

            <div className="flex justify-between gap-8 mt-4">
                <button
                    className={'btn btn-neutral'}
                    onClick={handleBack}
                    disabled={loading}
                >
                    Voltar
                </button>
                <button className={'btn btn-primary w-24'} type={'submit'}>
                    {loading ? (
                        <span className="loading loading-spinner "></span>
                    ) : (
                        'Proximo'
                    )}
                </button>
            </div>

        </form>
    );
};

export default ColetaEntregaForm;