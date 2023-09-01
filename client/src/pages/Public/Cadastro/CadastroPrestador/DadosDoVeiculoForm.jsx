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
} from './formData.js';

const veiculoSchema = yup.object({
    tipoVeiculo: yup.mixed().oneOf(tipoVeiculo, 'selecione um tipo').required(),
    tipoCarroceria: yup
        .mixed()
        .oneOf(tipoCarroceria, 'selecione um tipo')
        .required(),
    anoDeFabricacao: yup.string().min(4).max(4),
});

const DadosDoVeiculoForm = ({
    onSubmit,
    handleBack,
    prestadorData,
    loading,
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

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'max-w-md mt-5 mx-auto rounded-box bg-gray-300 p-10'}
            >
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
                        defaultValue={prestadorData?.tipoCarroceria ? prestadorData?.tipoDaCarroceria : ''}
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
                        defaultValue={prestadorData?.anoDeFabricacao ? prestadorData?.anoDeFabricacao : ''}
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

                {/*<div className="flex justify-between gap-8 mt-4">*/}
                {/*    <button className={'btn btn-neutral'} onClick={handleBack}>Voltar</button>*/}
                {/*    <button className={'btn btn-primary'} type={"submit"}>Proximo</button>*/}
                {/*</div>*/}

                <div className="flex justify-between gap-8 mt-4">
                    <button
                        className={'btn btn-neutral'}
                        type={"button"}
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
        </>
    );
};

export default DadosDoVeiculoForm;
