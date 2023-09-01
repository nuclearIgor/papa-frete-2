import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

const categoriasCNH = ['A', 'B', 'C', 'D', 'E', 'F'];

const dadosPessoaisSchema = yup.object({
    nome: yup.string().min(6).required(),
    // cpf: yup.string().min(11).max(11).required(),
    ddd: yup.string().length(2).required(),
    telefone: yup
        .string()
        .required('Insira seu telefone')
        .min(10, 'verifique seu número de telefone'),
    cnh: yup.string().min(11).max(11).required(),
    categoriaCNH: yup
        .mixed()
        .oneOf(categoriasCNH, 'selecione um tipo')
        .required(),
});

function mascaraTelefone(value) {
    return value
        .replace(/\D/g, '') //Remove tudo o que não é dígito
        // .replace(/^(\d{2})(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen antes dos quatro últimos dígitos
}

const DadosPessoaisForm = ({
    onSubmit,
    prestadorData,
    loading,
}) => {

    const { nome, telefone, cnh, categoriaCNH, ddd } = prestadorData;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(dadosPessoaisSchema),
        shouldFocusError: true,
        shouldUnregister: true,
        shouldUseNativeValidation: false,
    });

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'max-w-md mt-5 mx-auto rounded-box bg-gray-300 p-10 border border-papaYellow'}
            >
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nome completo</span>
                    </label>

                    <input
                        defaultValue={nome ? nome : ''}
                        name="nome"
                        id="nome"
                        {...register('nome')}
                        type="text"
                        placeholder={'nome completo'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errors?.nome ? (
                        <p className={'text-red-500'}>
                            {errors?.nome?.message}
                        </p>
                    ) : null}
                </div>

                {/*<div className="form-control w-full max-w-xs">*/}
                {/*    <label className="label">*/}
                {/*        <span className="label-text">*/}
                {/*            CPF{' '}*/}
                {/*            <span className={'text-sm font-light'}>*/}
                {/*                (apenas numeros)*/}
                {/*            </span>*/}
                {/*        </span>*/}
                {/*    </label>*/}

                {/*    <p className={'text-red-500'}>{errors?.cpf?.message}</p>*/}

                {/*    <input*/}
                {/*        defaultValue={cpf ? cpf : ''}*/}
                {/*        name="cpf"*/}
                {/*        id="cpf"*/}
                {/*        {...register('cpf')}*/}
                {/*        type="text"*/}
                {/*        placeholder={'CPF'}*/}
                {/*        className="input input-bordered w-full max-w-xs"*/}
                {/*    />*/}
                {/*</div>*/}

                <div className={'flex gap-2 w-full max-w-xs'}>
                    <div className="form-control basis-1/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">Celular</span>
                        </label>

                        {errors?.ddd ? (
                            <p className={'text-red-500'}>
                                {errors?.ddd?.message}
                            </p>
                        ) : null}

                        <input
                            defaultValue={ddd ? ddd : ''}
                            name="ddd"
                            id="ddd"
                            {...register('ddd')}
                            type="number"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="41"
                            maxLength={2}
                        />
                    </div>


                    <div className="form-control basis-3/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">Celular</span>
                        </label>

                        <input
                            defaultValue={telefone ? telefone : ''}
                            name="telefone"
                            id="telefone"
                            {...register('telefone')}
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="91234-1234"
                            onChange={event => {
                                const { value } = event.target;
                                event.target.value = mascaraTelefone(value);
                            }}
                            maxLength={10}
                        />
                        {errors?.telefone ? (
                            <p className={'text-red-500'}>
                                {errors?.telefone?.message}
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

                    <p className={'text-red-500'}>{errors?.cnh?.message}</p>

                    <input
                        defaultValue={cnh ? cnh : ''}
                        name="cnh"
                        id="cnh"
                        {...register('cnh')}
                        type="text"
                        placeholder={'CNH'}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Categoria da CNH </span>
                    </label>

                    <p className={'text-red-500'}>
                        {errors?.categoriaCNH?.message}
                    </p>

                    <select
                        className="select select-bordered"
                        defaultValue={categoriaCNH ? categoriaCNH : ''}
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
                </div>

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

export default DadosPessoaisForm;
