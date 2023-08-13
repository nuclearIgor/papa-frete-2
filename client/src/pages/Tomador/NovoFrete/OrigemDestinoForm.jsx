import {useEffect, useState} from 'react';
import {ESTADOS} from "../../../../util/cidades.js";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const OrigemDestinoSchema = yup.object({
    ufOrigem: yup.string().length(2).required(),
    cidadeOrigem: yup.string().required(),
    ufDestino: yup.string().length(2).required(),
    cidadeDestino: yup.string().required(),
});

const OrigemDestinoForm = ({ loading, onSubmit, frete }) => {
    const [ufOrigem, setUfOrigem] = useState(frete.ufOrigem)
    const [ufDestino, setUfDestino] = useState(frete.ufDestino)

    const { cidadeOrigem, cidadeDestino } = frete

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(OrigemDestinoSchema),
        shouldFocusError: true,
        shouldUnregister: true,
        shouldUseNativeValidation: false,
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={'max-w-md mx-auto rounded-box p-10 flex flex-col gap-4 border border-papaYellow'}
        >
            <div className={'flex flex-col items-center gap-2 w-4/5 mx-auto mb-5 mt-4'}>
                <label className="label">
                    <span className="label-text font-bold">Origem</span>
                </label>

                <div className={'flex gap-2 w-full justify-center'}>
                    <select
                        {...register('ufOrigem')}
                        onChange={e => setUfOrigem(e.target.value)}
                        name="ufOrigem"
                        id="ufOrigem"
                        defaultValue={ufOrigem}
                        className={'select select-bordered basis-4/12'}
                    >
                        <option value="estado" disabled>Estado</option>
                        {Object.keys(ESTADOS).map(uf =>
                            <option value={uf} key={uf}>{uf}</option>)}
                    </select>

                    {errors?.ufOrigem ? (
                        <p className={'text-red-500'}>
                            {errors?.ufOrigem?.message}
                        </p>
                    ) : null}

                    <select
                        {...register('cidadeOrigem')}
                        name="cidadeOrigem"
                        id="cidadeOrigem"
                        defaultValue={cidadeOrigem ? cidadeOrigem : 'cidade'}
                        className={'select select-bordered basis-8/12'}
                    >
                        <option value="cidade" disabled>Cidade</option>
                        {ufOrigem !== 'estado' && ESTADOS[`${ufOrigem}`].map(item =>
                            <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                    </select>

                    {errors?.cidadeOrigem ? (
                        <p className={'text-red-500'}>
                            {errors?.cidadeOrigem?.message}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className={'flex flex-col items-center gap-2 w-4/5 mx-auto mb-5 '}>
                <label className="label">
                    <span className="label-text font-bold">Destino</span>
                </label>

                <div className={'flex gap-2 w-full justify-center'}>
                    <select
                        {...register('ufDestino')}
                        onChange={e => setUfDestino(e.target.value)}
                        name="ufDestino"
                        id="ufDestino"
                        defaultValue={ufDestino}
                        className={'select select-bordered basis-4/12'}
                    >
                        <option value="estado" disabled>Estado</option>
                        {Object.keys(ESTADOS).map(uf =>
                            <option value={uf} key={uf}>{uf}</option>)}
                    </select>

                    {errors?.ufDestino ? (
                        <p className={'text-red-500'}>
                            {errors?.ufDestino?.message}
                        </p>
                    ) : null}

                    <select
                        {...register('cidadeDestino')}
                        name="cidadeDestino"
                        id="cidadeDestino"
                        defaultValue={cidadeDestino ? cidadeDestino : 'cidade'}
                        className={'select select-bordered basis-8/12'}
                    >
                        <option value="cidade" disabled>Cidade</option>
                        {ufDestino !== 'estado' && ESTADOS[`${ufDestino}`].map(item =>
                            <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                    </select>

                    {errors?.cidadeDestino ? (
                        <p className={'text-red-500'}>
                            {errors?.cidadeDestino?.message}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="flex justify-center gap-8 mt-4">
                <button className={'btn btn-primary w-24'} type={'submit'}>
                    {loading ? (
                        <span className="loading loading-spinner "></span>
                    ) : (
                        'Proximo'
                    )}
                </button>
            </div>
        </form>
    );
};

export default OrigemDestinoForm;