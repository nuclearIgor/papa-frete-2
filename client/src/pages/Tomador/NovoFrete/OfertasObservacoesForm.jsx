import React, {useState} from 'react';
import {BsInfoCircleFill} from "react-icons/bs";

const OfertasObservacoesForm = ({ handleBack, loading, onSubmit, frete}) => {

    const [reaisPorKm, setReaisPorKm] = useState(frete.reaisPorKm)

    const [oferecePedagio, setOferecePedagio] = useState(!!frete.oferecePedagio)
    const [oferecePernoite, setOferecePernoite] = useState(!!frete.oferecePernoite)
    const [ofereceCarga, setOfereceCarga] = useState(!!frete.ofereceCarga)
    const [ofereceDescarga, setOfereceDescarga] = useState(!!frete.ofereceDescarga)

    const [observacoes, setObservacoes] = useState(frete.observacoes)
    const [observacoesErro, setObservacoesErro] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(!!observacoes)

        if (!observacoes) {
            setObservacoesErro('campo obrigatorio')
            return
        }

        const values = {
            ofereceCarga,
            ofereceDescarga,
            oferecePedagio,
            oferecePernoite,
            observacoes,
            reaisPorKm: Number.isNaN(reaisPorKm) ? 'x' : reaisPorKm
        }

        onSubmit(values)
    }

    return (
        <form
            className={'max-w-md mx-auto rounded-box p-10 flex flex-col gap-4 border border-papaYellow'}
            onSubmit={handleSubmit}
        >
            <div className="flex max-w-xs items-center">
                <label className="text-right basis-3/5 pr-3">
                    <span className="label-text font-bold">Preco por km: <span className={'text-green-700'}>R$</span></span>
                </label>

                <input
                    onChange={e => setReaisPorKm(e.target.value)}
                    value={reaisPorKm}
                    type="number"
                    maxLength={4}
                    className={'w-2/5 input input-bordered'}
                />
                <span
                    className="tooltip rounded-full w-6 h-6 inline-block pl-2"
                    data-tip="este campo nao e obrigatorio. se nao quiser preenche-lo, basta clicar em continuar">
                            <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
            </div>

            <div className={'max-w-xs'}>
                <label className="label">
                    <span className="label-text font-bold">Adicionais</span>
                </label>

                <div className={'w-4/5 mx-auto'}>
                    <div className={'flex justify-between'}>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={oferecePedagio}
                                    className="checkbox mr-2"
                                    onChange={e => setOferecePedagio(e.target.checked)}
                                />
                                <span className="label-text">Pedagio</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={oferecePernoite}
                                    className="checkbox mr-2"
                                    onChange={e => setOferecePernoite(e.target.checked)}
                                />
                                <span className="label-text">Pernoite</span>
                            </label>
                        </div>

                    </div>

                    <div className={'flex justify-between'}>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={ofereceCarga}
                                    className="checkbox mr-2"
                                    onChange={e => setOfereceCarga(e.target.checked)}
                                />
                                <span className="label-text">Carga</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={ofereceDescarga}
                                    className="checkbox mr-2"
                                    onChange={e => setOfereceDescarga(e.target.checked)}
                                />
                                <span className="label-text">Descarga</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-xs flex flex-col items-center">
                <label className="label">
                    <span className="label-text font-bold">Observacoes</span>
                </label>

                <textarea
                    name=""
                    id=""
                    cols="35"
                    rows="7"
                    className={'rounded-md'}
                    value={observacoes}
                    onChange={e => {
                        setObservacoes(e.target.value)
                        setObservacoesErro('')
                    }}
                />

                {observacoesErro ? (
                    <p className={'text-red-500'}>
                        {observacoesErro}
                    </p>
                ) : null}

            </div>

            <div className="flex justify-between gap-8 mt-4">
                <div
                    className={'btn btn-neutral'}
                    onClick={handleBack}
                    disabled={loading}
                >
                    Voltar
                </div>
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

export default OfertasObservacoesForm;