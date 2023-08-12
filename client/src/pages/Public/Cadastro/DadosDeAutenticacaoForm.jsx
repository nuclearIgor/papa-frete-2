import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const authSchema = yup.object({
    email: yup.string().email('email invalido').required('campo obrigatorio'),
    senha: yup
        .string()
        .min(6, 'minimo 6 caracteres')
        .required('campo obrigatorio'),
});

const DadosDeAutenticacaoForm = ({ onSubmit, loading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(authSchema),
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'max-w-md mt-5 mx-auto bg-gray-300 rounded-box p-10 border border-papaYellow'}
            >
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    <input
                        name="email"
                        id="email"
                        {...register('email')}
                        type="text"
                        placeholder={'email'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errors?.email ? (
                        <p className={'text-red-500'}>
                            {errors?.email?.message}
                        </p>
                    ) : null}

                </div>

                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                        <span className="label-text">Senha</span>
                    </label>

                    <input
                        name="senha"
                        id="senha"
                        {...register('senha')}
                        type="password"
                        placeholder={'senha'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errors?.senha ? (
                        <p className={'text-red-500'}>
                            {errors?.senha?.message}
                        </p>
                    ) : null}

                </div>

                <div className="flex mt-4 justify-center">
                    <button className={'btn bg-papaYellow hover:bg-papaBlue hover:text-white w-24'} type={'submit'}>
                        Proximo
                    </button>
                </div>
            </form>
        </>
    );
};

export default DadosDeAutenticacaoForm;
