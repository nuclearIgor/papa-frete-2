import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    tipoVeiculo,
    tipoVeiculoLeve,
    tipoVeiculoMedio,
    tipoVeiculoPesado,
    tipoCarroceria,
    tipoCarroceriaFechada,
    tipoCarroceriaAberta,
    tipoCarroceriaEspecial,
    anos,
} from "../../../Public/Cadastro/CadastroPrestador/formData.js";

import axios from "axios";
import {baseUrl} from "../../../../App.jsx";
import toast from "react-hot-toast";
import {useState} from "react";

const veiculoSchema = yup.object({
    tipoVeiculo: yup.mixed().oneOf(tipoVeiculo, 'selecione um tipo').required(),
    tipoCarroceria: yup
        .mixed()
        .oneOf(tipoCarroceria, 'selecione um tipo')
        .required(),
    anoDeFabricacao: yup.string().min(4).max(4),
});

const EditarVeiculoForm = ({
    handleReload,
    prestadorData,
    token,
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(veiculoSchema),
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${baseUrl}/api/prestadores/${prestadorData.id}/dados-veiculo`, values, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            handleReload()
            setLoading(false)
        } catch (e) {
            console.log(e)
            toast.error('algo deu errado\n tente novamente em alguns minutos')
            setLoading(false)
        }
        console.log('values:\n', values)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'max-w-md mt-5 mx-auto rounded-box bg-gray-300 p-10'}
            >
                <div className={'flex justify-end gap-6 items-center max-w-xs mb-2'}>
                    <h4 className={'text-center text-papaBlue'}>Endereco</h4>

                    <button className={'btn btn-primary w-24'} type={'submit'}>
                        {loading ? (
                            <span className="loading loading-spinner "></span>
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Tipo do veiculo</span>
                    </label>

                    <select
                        className="select select-bordered"
                        defaultValue={prestadorData?.tipoDoVeiculo ? prestadorData?.tipoDoVeiculo : ''}
                        {...register('tipoVeiculo')}
                        id={'tipoVeiculo'}
                        name={'tipoVeiculo'}
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
                    <p className={'text-red-500'}>
                        {errors?.tipoVeiculo?.message}
                    </p>
                </div>

                <div className="divider"></div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Tipo da carroceria</span>
                    </label>

                    <select
                        className="select select-bordered"
                        defaultValue={prestadorData?.tipoDaCarroceria ? prestadorData?.tipoDaCarroceria : ''}
                        {...register('tipoCarroceria')}
                        id={'tipoCarroceria'}
                        name={'tipoCarroceria'}
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
                    <p className={'text-red-500'}>
                        {errors?.tipoCarroceria?.message}
                    </p>
                </div>

                <div className="divider"></div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">ano de fabricacao</span>
                    </label>

                    <select
                        className="select select-bordered"
                        defaultValue={prestadorData?.anoDeFabricacaoDoVeiculo ? prestadorData?.anoDeFabricacaoDoVeiculo : ''}
                        {...register('anoDeFabricacao')}
                        id={'anoDeFabricacao'}
                        name={'anoDeFabricacao'}
                    >
                        <option disabled selected value={''}>
                            Selecione o ano
                        </option>
                        {anos.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                    <p className={'text-red-500'}>
                        {errors?.tipoCarroceria?.message}
                    </p>
                </div>

            </form>
        </>
    );
};

export default EditarVeiculoForm;
