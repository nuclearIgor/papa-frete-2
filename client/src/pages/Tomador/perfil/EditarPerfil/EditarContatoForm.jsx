import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import {baseUrl} from "../../../../App.jsx";
import toast from "react-hot-toast";
import {useState} from "react";

function mascaraTelefone(value) {
    return value
        .replace(/\D/g, '') //Remove tudo o que não é dígito
        // .replace(/^(\d{2})(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen antes dos quatro últimos dígitos
}

const dadosDoContatoSchema = yup.object({
    ddd: yup.string().length(2).required(),
    celular: yup
        .string()
        .required('Insira seu telefone')
        .min(10, 'verifique seu número de telefone'),
    nomeDoContato: yup.string().required(),
});

const EditarContatoForm = ({tomadorData, handleReload, token }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(dadosDoContatoSchema),
        shouldFocusError: true,
        shouldUnregister: true,
        shouldUseNativeValidation: false,
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${baseUrl}/api/tomadores/${tomadorData.id}/dados-contato`, values, {
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
                className={'max-w-md mt-5 mx-auto rounded-box border border-papaYellow bg-base-100 p-10'}
            >
                <div className={'flex justify-end gap-6 items-center max-w-xs mb-2'}>
                    <h4 className={'text-center text-papaBlue'}>Contato</h4>

                    <button className={'btn btn-primary w-24'} type={'submit'}>
                        {loading ? (
                            <span className="loading loading-spinner "></span>
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </div>

                <div className={'flex gap-2 w-full max-w-xs'}>
                    <div className="form-control basis-1/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">DDD</span>
                        </label>

                        <input
                            defaultValue={tomadorData?.ddd ? tomadorData?.ddd : ''}
                            name="ddd"
                            id="ddd"
                            {...register('ddd')}
                            type="number"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="41"
                            maxLength={2}
                        />

                        {errors?.ddd ? (
                            <p className={'text-red-500'}>
                                {errors?.ddd?.message}
                            </p>
                        ) : null}
                    </div>


                    <div className="form-control basis-3/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">Celular</span>
                        </label>

                        <input
                            defaultValue={tomadorData?.telefone ? tomadorData?.telefone : ''}
                            name="celular"
                            id="celular"
                            {...register('celular')}
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="91234-1234"
                            onChange={event => {
                                const { value } = event.target;
                                event.target.value = mascaraTelefone(value);
                            }}
                            maxLength={10}
                        />
                        {errors?.celular ? (
                            <p className={'text-red-500'}>
                                {errors?.celular?.message}
                            </p>
                        ) : null}
                    </div>

                </div>

                <div className={'flex gap-2 w-full max-w-xs items-end'}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Nome do contato</span>
                        </label>

                        <input
                            defaultValue={tomadorData?.nomeDoContato ? tomadorData?.nomeDoContato : ''}
                            name="nomeDoContato"
                            id="nomeDoContato"
                            {...register('nomeDoContato')}
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Como quer ser chamado(a)?"
                        />

                        {errors?.nomeDoContato ? (
                            <p className={'text-red-500'}>
                                {errors?.nomeDoContato?.message}
                            </p>
                        ) : null}
                    </div>
                </div>

            </form>
        </>
    );
};

export default EditarContatoForm;
