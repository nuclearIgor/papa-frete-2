import * as yup from 'yup';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const endereçoSchema = yup.object({
    cep: yup.string().length(8).matches('[0-9]*', 'apenas numeros').required(),
    // estado: yup.string().required(),
    // cidade: yup.string().required(),
    // rua: yup.string().required(),
    // bairro: yup.string().required(),
    numero: yup.string().required(),
    complemento: yup.string(),
});

const DadosDoEnderecoForm = ({prestadorData, onSubmit, handleBack, loading, setLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(endereçoSchema),
        shouldFocusError: true,
        shouldUnregister: true,
        shouldUseNativeValidation: false,
    });

    const [cepData, setCepData] = useState({});
    const [cepErrorMessage, setCepErrorMessage] = useState(null);

    const [visibilidadeEndereco, setVisibilidadeEndereco] = useState(false);

    const [cepError, setCepError] = useState(false);

    useEffect(() => {
        if (!prestadorData.cep) {
            return
        }
        const cep = document.getElementById('cep')
        cep.value = String(prestadorData?.cep).replace("-", "")
        setCepData({
            bairro: prestadorData?.bairro,
            cep: prestadorData?.cep,
            uf: prestadorData?.estado,
            localidade: prestadorData?.cidade,
            logradouro: prestadorData?.rua,
        })
        setVisibilidadeEndereco(true)
    }, [])
    const buscaCep = async () => {
        setLoading(true);

        try {
            const cep = document.getElementById('cep').value;
            if (Number.isNaN(Number(cep))) {
                setCepErrorMessage('insira apenas numeros');
                setLoading(false);
                return;
            }
            if (cep.length !== 8) {
                setCepErrorMessage('cep deve conter exatamente 8 caracteres');
                setLoading(false);
                return;
            }
            setCepErrorMessage(null);

            const { data } = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`,
            );
            if (data.erro) {
                setCepError(true);
                setLoading(false);
                return;
            }
            setCepError(false);

            delete data.gia;
            delete data.siafi;
            delete data.ibge;
            delete data.ddd;
            delete data.complemento;

            setCepData(data);
            // console.log('busca cep: \n', data)
            setVisibilidadeEndereco(true);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    const handleFormSubmit = values => {
        console.log('values:\n', values);
        const data = { ...values, ...cepData };

        console.log('data:\n', data);
        console.log('cepData:\n', cepData);

        onSubmit(data);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={'max-w-md mt-5 mx-auto border border-papaYellow rounded-box bg-gray-300 p-10'}
            >
                <div className={'flex gap-2 w-full max-w-xs items-end'}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                CEP{' '}
                                <span className={'text-sm font-light'}>
                                    (apenas numeros)
                                </span>
                            </span>
                        </label>

                        {cepErrorMessage ? (
                            <p className={'text-red-500'}>
                                {cepErrorMessage}
                                {/*{errors?.cep?.message}*/}
                            </p>
                        ) : null}
                        <input
                            name="cep"
                            id="cep"
                            {...register('cep')}
                            type="number"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="CEP"
                            maxLength={8}
                        />

                        {cepError ? <p>cep invalido</p> : null}
                    </div>
                    <div className="btn btn-primary" onClick={buscaCep}>
                        {loading ? (
                            <span className="loading loading-spinner "></span>
                        ) : (
                            'Buscar'
                        )}
                    </div>
                </div>

                <div
                    className={`flex gap-2 w-full max-w-xs ${
                        visibilidadeEndereco ? 'block' : 'hidden'
                    }`}
                >
                    <div className="form-control flex-auto w-1/5 max-w-xs">
                        <label className="label">
                            <span className="label-text">Estado</span>
                        </label>

                        <p className={'text-red-500'}>{errors?.uf?.message}</p>
                        <input
                            disabled
                            name="uf"
                            id="uf"
                            {...register('uf')}
                            type="text"
                            className={`input input-bordered w-full max-w-xs`}
                            placeholder="PR"
                            defaultValue={cepData?.uf}
                        />
                    </div>

                    <div
                        className={`form-control flex-auto w-3/5 max-w-xs ${
                            visibilidadeEndereco ? 'block' : 'hidden'
                        }`}
                    >
                        <label className="label">
                            <span className="label-text">Cidade</span>
                        </label>

                        <p className={'text-red-500'}>
                            {errors?.localidade?.message}
                        </p>
                        <input
                            disabled
                            name="localidade"
                            id="localidade"
                            {...register('localidade')}
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="cidade"
                            defaultValue={cepData?.localidade}
                        />
                    </div>
                </div>

                <div
                    className={`form-control w-full max-w-xs ${
                        visibilidadeEndereco ? 'block' : 'hidden'
                    }`}
                >
                    <label className="label">
                        <span className="label-text">Bairro</span>
                    </label>

                    <p className={'text-red-500'}>{errors?.bairro?.message}</p>
                    <input
                        disabled
                        name="bairro"
                        id="bairro"
                        {...register('bairro')}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="bairro"
                        defaultValue={cepData?.bairro}
                    />
                </div>

                <div
                    className={`flex gap-2 w-full max-w-xs ${
                        visibilidadeEndereco ? 'block' : 'hidden'
                    }`}
                >
                    <div className="form-control flex-auto w-3/5 max-w-xs">
                        <label className="label">
                            <span className="label-text">Rua</span>
                        </label>

                        <p className={'text-red-500'}>
                            {errors?.logradouro?.message}
                        </p>
                        <input
                            disabled
                            name="logradouro"
                            id="logradouro"
                            {...register('logradouro')}
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="rua"
                            defaultValue={cepData?.logradouro}
                        />
                    </div>

                    <div className="form-control  flex-auto w-1/5 max-w-xs">
                        <label className="label">
                            <span className="label-text">Numero</span>
                        </label>

                        <input
                            name="numero"
                            id="numero"
                            {...register('numero')}
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="00"
                        />
                        <p className={'text-red-500'}>
                            {errors?.numero?.message}
                        </p>
                    </div>
                </div>

                <div
                    className={`form-control w-full max-w-xs ${
                        visibilidadeEndereco ? 'block' : 'hidden'
                    }`}
                >
                    <label className="label">
                        <span className="label-text">
                            Complemento{' '}
                            <span className={'text-sm font-light'}>
                                (opcional)
                            </span>
                        </span>
                    </label>

                    <input
                        name="complemento"
                        id="complemento"
                        {...register('complemento')}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="complemento"
                    />
                    <p className={'text-red-500'}>
                        {errors?.complemento?.message}
                    </p>
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

export default DadosDoEnderecoForm;
