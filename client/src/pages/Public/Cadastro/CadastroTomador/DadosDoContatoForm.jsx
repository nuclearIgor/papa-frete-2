import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

const DadosDoContatoForm = ({ onSubmit, handleBack, loading, tomadorData }) => {
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

    const { ddd, telefone, nomeDoContato } = tomadorData;

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'max-w-md mt-5 mx-auto rounded-box border border-papaYellow bg-gray-300 p-10'}
            >
                <div className={'flex gap-2 w-full max-w-xs'}>
                    <div className="form-control basis-1/4 max-w-xs">
                        <label className="label">
                            <span className="label-text">DDD</span>
                        </label>

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
                            defaultValue={telefone ? telefone : ''}
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
                            defaultValue={nomeDoContato ? nomeDoContato : ''}
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

                {/*<div className="flex justify-between gap-8 mt-4">*/}
                {/*    <button className={'btn btn-neutral'}  onClick={handleBack}>Voltar</button>*/}
                {/*    <button className={'btn btn-primary w-24'} type={"submit"}>*/}
                {/*        /!*<span className="loading loading-spinner "></span>*!/*/}

                {/*        Proximo*/}
                {/*    </button>*/}
                {/*</div>*/}

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
        </>
    );
};

export default DadosDoContatoForm;
