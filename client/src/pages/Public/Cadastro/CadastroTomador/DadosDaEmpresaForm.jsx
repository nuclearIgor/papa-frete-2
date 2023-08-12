import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ramoOptions = ['transportadora', 'embarcadora', 'agenciadora'];

const dadosDaEmpresaSchema = yup.object({
    cnpj: yup.string().min(14).required(),
    nomeFantasia: yup.string().min(4).required(),
    ramo: yup.mixed().oneOf(ramoOptions).required(),
});
const DadosDaEmpresaForm = ({ onSubmit, handleBack, tomadorData, loading }) => {
    const { cnpj, nomeFantasia, ramo } = tomadorData;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(dadosDaEmpresaSchema),
        shouldFocusError: true,
        shouldUnregister: true,
        shouldUseNativeValidation: false,
    });

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'max-w-md mt-5 mx-auto rounded-box border border-papaYellow bg-gray-300 p-10'}
            >
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            CNPJ{' '}
                            <span className={'text-sm font-light'}>
                                (apenas numeros)
                            </span>
                        </span>
                    </label>

                    <input
                        defaultValue={cnpj ? cnpj : ''}
                        name="cnpj"
                        id="cnpj"
                        {...register('cnpj')}
                        type="text"
                        placeholder={'CNPJ'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errors?.cnpj ? (
                        <p className={'text-red-500'}>
                            {errors?.cnpj?.message}
                        </p>
                    ) : null}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nome fantasia</span>
                    </label>

                    <p className={'text-red-500'}>
                        {errors?.nomeFantasia?.message}
                    </p>

                    <input
                        defaultValue={nomeFantasia ? nomeFantasia : ''}
                        name="nomeFantasia"
                        id="nomeFantasia"
                        {...register('nomeFantasia')}
                        type="text"
                        placeholder={'Nome fantasia'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errors?.nomeFantasia ? (
                        <p className={'text-red-500'}>
                            {errors?.nomeFantasia?.message}
                        </p>
                    ) : null}

                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Ramo</span>
                    </label>

                    <select
                        className="select select-bordered"
                        defaultValue={ramo ? ramo : ''}
                        {...register('ramo')}
                        id={'ramo'}
                        name={'ramo'}
                    >
                        <option disabled selected value={''}>
                            Selecione
                        </option>
                        {ramoOptions.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </select>

                    {errors?.ramo ? (
                        <p className={'text-red-500'}>
                            {errors?.ramo?.message}
                        </p>
                    ) : null}

                </div>

                {/*<div className="flex justify-between gap-8 mt-4">*/}
                {/*    <button className={'btn btn-neutral'}  onClick={handleBack}>Voltar</button>*/}
                {/*    <button className={'btn btn-primary w-24'} type={"submit"}>*/}
                {/*        /!*<span className="loading loading-spinner "></span>*!/*/}

                {/*        Proximo*/}
                {/*    </button>*/}
                {/*</div>*/}

                <div className="flex justify-end gap-8 mt-4">
                    {/*<button className={'btn btn-neutral'}  onClick={handleBack} disabled={loading}>Voltar</button>*/}
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

export default DadosDaEmpresaForm;
