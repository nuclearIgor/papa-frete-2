import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {AiFillEdit} from "react-icons/ai";
import axios from "axios";
import {baseUrl} from "../../../../App.jsx";
import toast from "react-hot-toast";

const categoriasCNH = ['A', 'B', 'C', 'D', 'E', 'F'];

const dadosPessoaisSchema = yup.object({
    nomeCompleto: yup.string().min(6, "minimo 6 caracteres").required("campo obrigatorio"),
    // cpf: yup.string().min(11, "verifique seu cpf").max(11, "verifique seu cpf").required("campo obrigatorio"),
    ddd: yup.string().length(2).required("campo obrigatorio"),
    celular: yup
        .string()
        .required('Insira seu telefone')
        .min(10, 'verifique seu número de telefone'),
    // cnh: yup.string().min(11).max(11).required("campo obrigatorio"),
    categoriaCNH: yup
        .mixed()
        .oneOf(categoriasCNH, 'selecione um tipo')
        .required("campo obrigatorio"),
});

function mascaraTelefone(value) {
    return value
        .replace(/\D/g, '') //Remove tudo o que não é dígito
        // .replace(/^(\d{2})(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen antes dos quatro últimos dígitos
}

const EditarDadosPessoaisForm = ({
    prestadorData,
    handleReload,
    token
}) => {
    // useEffect(() => {
    //     console.log(prestadorData);
    // }, [prestadorData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getFieldState
    } = useForm({
        resolver: yupResolver(dadosPessoaisSchema),
        shouldFocusError: true,
        shouldUnregister: true,
        shouldUseNativeValidation: false,
    });

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${baseUrl}/api/prestadores/${prestadorData.id}/dados-pessoais`, values, {
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
                className={'max-w-md mt-5 mx-auto rounded-box bg-base-100 p-10 border border-papaYellow'}
            >
                <div className={'flex justify-end gap-6 items-center max-w-xs mb-2'}>
                        <h4 className={'text-center text-papaBlue'}>Dados Pessoais</h4>

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
                        <span className="label-text">Nome completo</span>
                    </label>

                    <input
                        defaultValue={prestadorData?.nome ? prestadorData?.nome : ''}
                        name="nomeCompleto"
                        id="nomeCompleto"
                        {...register('nomeCompleto')}
                        type="text"
                        placeholder={'nome completo'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errors?.nomeCompleto ? (
                        <p className={'text-red-500 font-light text-sm'}>
                            {errors?.nomeCompleto?.message}
                        </p>
                    ) : null}

                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            CPF{' '}
                            <span className={'text-sm font-light'}>
                                (apenas numeros)
                            </span>
                        </span>
                    </label>

                    <input
                        disabled
                        defaultValue={prestadorData?.cpf ? prestadorData?.cpf : ''}
                        name="cpf"
                        id="cpf"
                        //{...register('cpf')}
                        type="text"
                        placeholder={'CPF'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <p className={'text-red-500 font-light text-sm'}>{errors?.cpf?.message}</p>
                </div>

                <div className={'flex gap-2 w-full max-w-xs'}>
                    <div className="form-control basis-1/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">Celular</span>
                        </label>

                        <input
                            // disabled={!isEditing}
                            defaultValue={prestadorData?.ddd ? prestadorData?.ddd : ''}
                            name="ddd"
                            id="ddd"
                            {...register('ddd')}
                            type="number"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="41"
                            maxLength={2}
                        />

                        {errors?.ddd ? (
                            <p className={'text-red-500 font-light text-sm'}>
                                {errors?.ddd?.message}
                            </p>
                        ) : null}
                    </div>


                    <div className="form-control basis-3/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">Celular</span>
                        </label>

                        <input
                            // disabled={!isEditing}
                            defaultValue={prestadorData?.telefone ? prestadorData?.telefone : ''}
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

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Numero da CNH
                            {/*<span className={'text-sm font-light'}>(apenas numeros)</span>*/}
                        </span>
                    </label>

                    <input
                        disabled
                        defaultValue={prestadorData?.cnh ? prestadorData?.cnh : ''}
                        name="cnh"
                        id="cnh"
                        //{...register('cnh')}
                        type="text"
                        placeholder={'CNH'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <p className={'text-red-500 text-sm font-light'}>{errors?.cnh?.message}</p>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Categoria da CNH </span>
                    </label>

                    <select
                        // disabled={!isEditing}
                        className="select select-bordered"
                        defaultValue={prestadorData?.categoriaCNH ? prestadorData?.categoriaCNH : ''}
                        {...register('categoriaCNH')}
                        id={'categoriaCNH'}
                        name={'categoriaCNH'}
                    >
                        {categoriasCNH.map(v => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </select>

                    <p className={'text-red-500'}>
                        {errors?.categoriaCNH?.message}
                    </p>
                </div>

                {/*<div className="flex justify-end gap-8 mt-4">*/}
                {/*    /!*<button className={'btn btn-neutral'}  onClick={handleBack} disabled={loading}>Voltar</button>*!/*/}
                {/*    <button className={'btn btn-primary w-24'} type={'submit'}>*/}
                {/*        {loading ? (*/}
                {/*            <span className="loading loading-spinner "></span>*/}
                {/*        ) : (*/}
                {/*            'Proximo'*/}
                {/*        )}*/}
                {/*    </button>*/}
                {/*</div>*/}
            </form>
        </>
    );
};

export default EditarDadosPessoaisForm;
