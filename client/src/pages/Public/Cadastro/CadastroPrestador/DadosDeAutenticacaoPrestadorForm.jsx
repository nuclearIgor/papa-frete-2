import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import {baseUrl} from "../../../../App.jsx";
import toast from "react-hot-toast";
import {useState} from "react";

const authSchema = yup.object({
    email: yup.string().email('email invalido').required('campo obrigatorio'),
    senha: yup
        .string()
        .min(6, 'minimo 6 caracteres')
        .required('campo obrigatorio'),
    cpf: yup.string().min(11).max(11).required(),
});

const DadosDeAutenticacaoPrestadorForm = ({ onSubmit }) => {
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

    const [ loading, setLoading ] = useState(false)

    const [ emailError, setEmailError ] = useState(false)
    const [ cpfError, setCpfError ] = useState(false)

    const checkForEmailAndCpf = async (values) => {
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/api/prestadores/check-create`, {
                email: values.email,
                cpf: values.cpf
            })

            if (res.status === 204) {
                onSubmit({
                    tipoDeConta: 'prestador',
                    ...values
                })

                setLoading(false)
            }

        } catch (e) {
            if(e.response?.data?.message === 'email ja em uso') {
                toast.error('email ja cadastrado')
                setEmailError(true)
                setLoading(false)
                return
            }
            if(e.response?.data?.message === 'cpf ja em uso') {
                toast.error('cpf ja cadastrado')
                setCpfError(true)
                setLoading(false)
                return
            }

            toast.error('algo deu errado \n tente novamente em alguns minutos')
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(checkForEmailAndCpf)}
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
                        className={`input input-bordered w-full max-w-xs ${emailError ? 'border border-red-600' : ''}`}
                        onChange={() => setEmailError(false)}
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

                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                        <span className="label-text">
                            CPF{' '}
                            <span className={'text-sm font-light'}>
                                (apenas numeros)
                            </span>
                        </span>
                    </label>

                    <input
                        name="cpf"
                        id="cpf"
                        {...register('cpf')}
                        type="text"
                        placeholder={'Seu cpf'}
                        className={`input input-bordered w-full max-w-xs ${cpfError ? 'border border-red-600' : ''}`}
                        onChange={() => setCpfError(false)}
                        maxLength={11}
                    />

                    {errors?.cpf ? (
                        <p className={'text-red-500'}>
                            {errors?.cpf?.message}
                        </p>
                    ) : null}
                </div>

                <div className="flex mt-4 justify-center">
                    <button className={'btn bg-papaYellow hover:bg-papaBlue hover:text-white w-24'} type={'submit'}>
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

export default DadosDeAutenticacaoPrestadorForm;
