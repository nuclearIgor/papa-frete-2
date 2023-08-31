import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link} from "react-router-dom";

const authSchema = yup.object({
    email: yup.string().email('email invalido').required('campo obrigatorio'),
    senha: yup
        .string()
        .min(6, 'minimo 6 caracteres')
        .required('campo obrigatorio'),
});

const LoginForm = ({ onSubmit }) => {
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
                className={'max-w-md mt-5 mx-auto rounded-box p-10 border-2'}
            >
                <h3 className={'font-bold text-lg text-center mb-8'}>Login</h3>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    <p className={'text-red-500'}>{errors?.email?.message}</p>

                    <input
                        name="email"
                        id="email"
                        {...register('email')}
                        type="text"
                        placeholder={'email'}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                        <span className="label-text">Senha</span>
                    </label>

                    <p className={'text-red-500'}>{errors?.senha?.message}</p>

                    <input
                        name="senha"
                        id="senha"
                        {...register('senha')}
                        type="password"
                        placeholder={'senha'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <Link className={'p-2 link text-sm text-blue-800'} to={'/forgot-password'}>esqueceu a senha?</Link>
                </div>

                <div className="flex mt-4 justify-center">
                    <button className={'btn bg-papaYellow hover:bg-papaBlue hover:text-white w-24'} type={'submit'}>
                            Login
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
