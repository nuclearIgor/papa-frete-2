import React, {useState} from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { tipoVeiculo,
    tipoVeiculoLeve,
    tipoVeiculoMedio,
    tipoVeiculoPesado,
    tipoCarroceria,
    tipoCarroceriaFechada,
    tipoCarroceriaAberta,
    tipoCarroceriaEspecial} from "../../Public/Cadastro/CadastroPrestador/formData.js";
import {BsInfoCircleFill} from "react-icons/bs";

const tiposDeCarga = ['seca', 'graos', 'refrigerada'];

const VeiculoCarroceriaCargaSchema = yup.object({
    tipoDeCarga: yup
        .mixed()
        .oneOf(tiposDeCarga, 'selecione um tipo')
        .required(),
    veiculoAlvo: yup.mixed().oneOf(tipoVeiculo, 'selecione um tipo').optional(),
    carroceriaAlvo: yup.mixed().oneOf(tipoCarroceria, 'selecione um tipo').optional()

});

const VeiculoCarroceriaPreferencialForm = ({ handleBack, loading, onSubmit}) => {

    const [tipoDeCarga, setTipoDeCarga] = useState('selecione')
    const [tipoDeCargaErro, setTipoDeCargaErro] = useState('')

    const [veiculoAlvo, setVeiculoAlvo] = useState('selecione')
    const [veiculoAlvoErro, setVeiculoAlvoErro] = useState('')

    const [carroceriaAlvo, setCarroceriaAlvo] = useState('selecione')
    const [carroceriaAlvoErro, setCarroceriaAlvoErro] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()

        const cargaIndex = tiposDeCarga.indexOf(tipoDeCarga)
        if(cargaIndex < 0) {
            setTipoDeCargaErro('Selecione um tipo valido')
            return
        }

        const values = {
            tipoDeCarga,
            veiculoAlvo: veiculoAlvo === 'selecione' ? 'x' : veiculoAlvo,
            carroceriaAlvo: carroceriaAlvo === 'selecione' ? 'x' : carroceriaAlvo
        }

        onSubmit(values)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={'max-w-md rounded-box mx-auto p-10 flex flex-col items-center gap-4 border border-papaYellow'}
        >
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text font-bold">Tipo da carga</span>
                </label>

                <select
                   // {...register('tipoDeCarga')}
                    id={'tipoDeCarga'}
                    name={'tipoDeCarga'}
                    className={'input input-bordered'}
                    // defaultValue={'selecione'}
                    onChange={e => {
                            setTipoDeCarga(e.target.value)
                            setTipoDeCargaErro('')
                        }
                    }
                >
                    <option disabled selected value={''}>
                        Selecione
                    </option>

                    {tiposDeCarga.map((tipo) => (
                        <option
                            className={'input input-bordered'}
                            value={tipo}
                            key={tipo}
                        >
                            {tipo}
                        </option>
                    ))}
                </select>

                {tipoDeCargaErro ? (
                    <p className={'text-red-500'}>
                        {tipoDeCargaErro}
                    </p>
                ) : null}
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <p className="label-text font-bold flex w-full relative">
                        Tipo do veiculo
                        <span className={'font-light pl-1'}>(Opcional)</span>
                        <span
                            className="tooltip rounded-full w-6 h-6 inline-block absolute right-0"
                            data-tip="este campo nao e obrigatorio. se nao quiser preenche-lo, basta clicar em continuar">
                            <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
                    </p>
                </label>

                <select
                    className="select select-bordered"
                    // defaultValue={tipoDoVeiculo ? tipoDoVeiculo : ''}
                    id={'veiculoAlvo'}
                    name={'veiculoAlvo'}
                    onChange={e => {
                            setVeiculoAlvo(e.target.value)
                            // setVeiculoAlvoErro('')
                        }
                    }
                >
                    <option disabled selected value={''}>
                        Selecione
                    </option>
                    <optgroup label={'Leves'}>
                        {tipoVeiculoLeve.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label={'Medios'}>
                        {/*<option disabled selected value={''}>Selecione</option>*/}
                        {tipoVeiculoMedio.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label={'Pesados'}>
                        {/*<option disabled selected value={''}>Selecione</option>*/}
                        {tipoVeiculoPesado.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </optgroup>
                </select>

                {/*{veiculoAlvoErro ? (*/}
                {/*    <p className={'text-red-500'}>*/}
                {/*        {veiculoAlvoErro}*/}
                {/*    </p>*/}
                {/*) : null}*/}

            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <p className="label-text font-bold flex w-full relative">
                        Tipo da carroceria
                        <span className={'font-light pl-1'}>(Opcional)</span>
                        <span
                            className="tooltip rounded-full w-6 h-6 inline-block absolute right-0"
                            data-tip="este campo nao e obrigatorio. se nao quiser preenche-lo, basta clicar em continuar">
                            <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
                    </p>
                </label>

                <select
                    onChange={e => {
                            setCarroceriaAlvo(e.target.value)
                            // setCarroceriaAlvoErro('')
                        }
                    }
                    className="select select-bordered"
                    // defaultValue={tipoCarroceria ? tipoDaCarroceria : ''}
                    //{...register('carroceriaAlvo')}
                    id={'carroceriaAlvo'}
                    name={'carroceriaAlvo'}
                >
                    <option disabled selected value={''}>
                        Selecione
                    </option>
                    <option value={'apenas cavalo'}>Apenas cavalo</option>
                    <optgroup label={'Abertas'}>
                        {tipoCarroceriaAberta.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label={'Fechadas'}>
                        {tipoCarroceriaFechada.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label={'Especiais'}>
                        {tipoCarroceriaEspecial.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </optgroup>
                </select>

                {/*{errors?.carroceriaAlvo ? (*/}
                {/*    <p className={'text-red-500'}>*/}
                {/*        {errors?.carroceriaAlvo?.message}*/}
                {/*    </p>*/}
                {/*) : null}*/}

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

export default VeiculoCarroceriaPreferencialForm;