import {AiFillEdit} from "react-icons/ai";
import React, {useContext, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ESTADOS} from "../../../../util/cidades.js";
import DatePicker from "react-datepicker";
import { brDateToUtc } from "../../../../util/brDateToUtc.js";
import {BsInfoCircleFill} from "react-icons/bs";
import {
    tipoCarroceriaAberta, tipoCarroceriaEspecial, tipoCarroceriaFechada,
    tipoVeiculo,
    tipoVeiculoLeve,
    tipoVeiculoMedio,
    tipoVeiculoPesado
} from "../../Public/Cadastro/CadastroPrestador/formData.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteFrete, editFrete} from "./requests.js";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import ConfirmarExclusaoModal from "./Modal.jsx";

const TomadorFretePage = ( ) => {
    const { state } = useLocation()
    const { frete } = state
    console.log(frete)

    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const [observacoesErro, setObservacoesErro] = useState('')
    const [precoPorKmErro, setPrecoPorKmErro] = useState('')


    const [editedFrete, setEditedFrete] = useState({
        ...frete
    })

    const queryClient = useQueryClient()

    const editMutation = useMutation({
        mutationFn: ({frete, token}) => editFrete(frete, token),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meus-fretes']})
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({freteId, token}) => deleteFrete(freteId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meus-fretes']})
        }
    })

    const { token } = useContext(AuthContext)

    const handleSalvar = async () => {
        setLoading(true)

        if (!editedFrete.observacoes) {
            setObservacoesErro('campo obrigatorio')
            setLoading(false)
            return
        }

        if (Number.isNaN(editedFrete.reaisPorKm)) {
            editedFrete.reaisPorKm = 'x'
        }

        editMutation.mutate({frete: editedFrete, token: token})

        setIsEditing(false)
        setLoading(false)
        console.log(editedFrete)
    }

    const navigate = useNavigate()

    const handleDelete = () => {
        setLoading(true)

        deleteMutation.mutate({freteId: editedFrete.id, token: token})
        setLoading(false)
        navigate('/meus-fretes')
    }

    const [isOpen, setIsOpen] = useState(undefined)

    const onAccept = () => {
        handleDelete()
        setIsOpen(undefined)
        console.log('accept')
    }
    const onDecline = () => {
        setIsOpen(undefined)
        console.log('decline')
    }

    return (
        <div className={'w-10/12 mx-auto border border-papaYellow rounded-box mt-2 pt-2 pb-10'}>
            <h2
                className={'text-center py-4 mt-2  flex justify-center items-center relative'}
            >
                Frete:
                <span className={'font-bold'}> IDENTIFICADOR </span>

                {isEditing ?
                    <div className={'flex flex-col items-center absolute right-10'}>
                        <button
                            className={'btn bg-papaYellow'}
                            onClick={handleSalvar}
                        >
                            Salvar</button>
                    </div>
                    :
                    <div
                        className={'flex flex-col items-center absolute right-10'}
                        onClick={() => setIsEditing(true)}
                    >
                        <AiFillEdit className={'h-8 w-8'}/>
                        <span className={'font-light'}>Editar</span>
                    </div>
                }
            </h2>

            {isEditing ?
                <div className="flex justify-end w-full py-6">
                    <div className={'flex  items-end w-2/5'}>
                        {/*<button*/}
                        {/*    className={'btn bg-red-600 text-white hover:bg-papaBlue w-24'}*/}
                        {/*    onClick={handleDelete}*/}
                        {/*>*/}
                        {/*    Excluir*/}
                        {/*</button>*/}

                        <ConfirmarExclusaoModal
                            buttonText={'Excluir'}
                            isOpen={isOpen}
                            setOpen={setIsOpen}
                            onAccept={onAccept}
                            onDecline={onDecline}
                        />

                        <label className="label cursor-pointer w-20 px-4">
                            <span className="label-text">Oculto</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary mx-2"
                                disabled={!isEditing}
                                onChange={e => setEditedFrete((prevState) => {
                                    console.log(e.target.checked)
                                    return {
                                        ...prevState,
                                       visivel: e.target.checked
                                    }
                                })}
                                // value={editedFrete.visivel}
                            />
                            {/*<span className="label-text">Visivel</span>*/}
                        </label>

                    </div>
                </div>
                : null
            }

            <div className={'flex gap-4 px-4'}>
                <div className={'flex flex-col items-center gap-2 w-4/5 mx-auto mb-5 mt-4 basis-1/2'}>
                    <label className="label">
                        <span className="label-text font-bold">Origem</span>
                    </label>

                    <div className={'flex gap-2 w-full justify-center'}>
                        <select
                            disabled={!isEditing}
                            onChange={e => setEditedFrete((prevState) => {
                                return {
                                    ...prevState,
                                    ufOrigem: e.target.value,
                                    cidadeOrigem: ESTADOS[`${e.target.value}`][0].nome
                                }
                            })}
                            name="ufOrigem"
                            id="ufOrigem"
                            defaultValue={frete.ufOrigem}
                            className={'select select-bordered basis-2/12'}
                        >
                            <option value="estado" disabled>Estado</option>
                            {Object.keys(ESTADOS).map(uf =>
                                <option value={uf} key={uf}>{uf}</option>)}
                        </select>

                        <select
                            disabled={!isEditing}
                            name="cidadeOrigem"
                            id="cidadeOrigem"
                            defaultValue={editedFrete.cidadeOrigem}
                            className={'select select-bordered basis-8/12'}
                            onChange={e => setEditedFrete((prevState) => {
                                return {
                                    ...prevState,
                                    cidadeOrigem: e.target.value
                                }
                            })}
                        >
                            <option value="cidade" disabled>Cidade</option>
                            <option
                                value={ESTADOS[`${editedFrete.ufOrigem}`][0].nome}
                                selected
                            >
                                {ESTADOS[`${editedFrete.ufOrigem}`][0].nome}
                            </option>
                            {ESTADOS[`${editedFrete.ufOrigem}`]
                                .map(item =>
                                <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                        </select>
                    </div>
                </div>

                <div className={'flex basis-1/2 flex-col items-center gap-2 w-4/5 mx-auto mb-5 mt-4'}>
                    <label className="label">
                        <span className="label-text font-bold">Destino</span>
                    </label>

                    <div className={'flex gap-2 w-full justify-center'}>
                        <select
                            disabled={!isEditing}
                            onChange={e => setEditedFrete((prevState) => {
                                return {
                                    ...prevState,
                                    ufDestino: e.target.value,
                                    cidadeDestino: ESTADOS[`${e.target.value}`][0].nome
                                }
                            })}
                            name="ufDestino"
                            id="ufDestino"
                            defaultValue={frete.ufDestino}
                            className={'select select-bordered basis-2/12'}
                        >
                            <option value="estado" disabled>Estado</option>
                            {Object.keys(ESTADOS).map(uf =>
                                <option value={uf} key={uf}>{uf}</option>)}
                        </select>

                        <select
                            disabled={!isEditing}
                            name="cidadeDestino"
                            id="cidadeDestino"
                            defaultValue={editedFrete.cidadeDestino}
                            className={'select select-bordered basis-8/12'}
                            onChange={e => setEditedFrete((prevState) => {
                                return {
                                    ...prevState,
                                    cidadeDestino: e.target.value
                                }
                            })}
                        >
                            <option value="cidade" disabled>Cidade</option>
                            <option
                                value={ESTADOS[`${editedFrete.ufDestino}`][0].nome}
                                selected
                            >
                                {ESTADOS[`${editedFrete.ufDestino}`][0].nome}
                            </option>
                            {ESTADOS[`${editedFrete.ufDestino}`]
                                .map(item =>
                                    <option value={item.nome} key={item.nome}>{item.nome}</option>)}
                        </select>

                    </div>
                </div>
            </div>

            <div className={'flex gap-4 px-4'}>

                <div
                    className={'form-control basis-1/2 flex flex-col items-center gap-2'}
                >
                    <label className="label">
                        <span className="label-text font-bold">Coleta</span>
                    </label>

                    <div className={'flex gap-4'}>
                        <select
                            name=""
                            id=""
                            className={'select select-bordered'}
                            defaultValue={editedFrete.coleta}
                            disabled={!isEditing}
                            onChange={e => setEditedFrete((prevState) => {
                                return {
                                    ...prevState,
                                    coleta: e.target.value,
                                }
                            })}
                        >
                            <option value="livre">coleta livre</option>
                            <option value="janela">janela</option>
                        </select>

                        {editedFrete.coleta === 'janela' ? (
                            <DatePicker
                                disabled={!isEditing}
                                className={'input text-center w-4/5 h-12 rounded-md bg-green-200 border border-papaBlue'}
                                selected={new Date( brDateToUtc(editedFrete.janelaColeta))}
                                dateFormat={'dd/MM/yyyy'}
                                // onChange={(date) => setColetaStartDate(date)}
                                onChange={date => setEditedFrete((prevState) => {
                                    return {
                                        ...prevState,
                                       janelaColeta: date.toLocaleString('pt-BR').slice(0, 10)
                                    }
                                })}
                            />
                        ) : null}
                    </div>
                </div>

                <div
                    className={'basis-1/2 form-control flex flex-col items-center gap-2'}
                >
                    <label className="label">
                        <span className="label-text font-bold">Entrega</span>
                    </label>

                    <div className={'flex gap-4'}>
                        <select
                            disabled={!isEditing}
                            name=""
                            id=""
                            defaultValue={editedFrete.entrega}
                            className={'select select-bordered'}
                            onChange={e => setEditedFrete((prevState) => {
                                return {
                                    ...prevState,
                                    entrega: e.target.value,
                                }
                            })}
                        >
                            <option value="sem agenda">Sem agenda</option>
                            <option value="janela">janela</option>
                            {[...Array(15).keys()].map((i) => (
                                <option key={i} value={`D+${i + 1}`}>
                                    D+{i + 1}
                                </option>
                            ))}
                        </select>

                        {editedFrete.entrega === 'janela' ? (
                            <DatePicker
                                disabled={!isEditing}
                                className={'input text-center w-4/5 h-12 rounded-md bg-green-200 border border-papaBlue'}
                                selected={editedFrete.janelaEntrega === 'x' ? new Date() : new Date(brDateToUtc(editedFrete.janelaEntrega))}
                                dateFormat={'dd/MM/yyyy'}
                                onChange={date => setEditedFrete((prevState) => {
                                    return {
                                        ...prevState,
                                        janelaEntrega: date.toLocaleString('pt-BR').slice(0, 10)
                                    }
                                })}
                            />
                        ) : null}
                    </div>
                </div>
            </div>

            <div className={'flex justify-center gap-4 p-4'}>
                <div className="form-control w-full max-w-xs p-4">
                    <label className="label">
                        <p className="label-text font-bold flex w-full relative">
                            Tipo do veiculo
                            <span className={'font-light pl-1'}>(Opcional)</span>
                            <span
                                className="tooltip rounded-full w-6 h-6 inline-block absolute right-0"
                                data-tip="este campo nao e obrigatorio.">
                            <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
                        </p>
                    </label>

                    <p className={'px-2 font-semibold'}>Atual: {frete.veiculoAlvo === 'x' ? 'indifere' : frete.veiculoAlvo}</p>

                    <select
                        className="select select-bordered"
                        // defaultValue={tipoDoVeiculo ? tipoDoVeiculo : ''}
                        disabled={!isEditing}
                        id={'veiculoAlvo'}
                        name={'veiculoAlvo'}
                        onChange={e => setEditedFrete((prevState) => {
                            return {
                                ...prevState,
                                veiculoAlvo: e.target.value
                            }
                        })}
                    >
                        <option disabled selected value={''}>
                            Selecione
                        </option>

                        <optgroup label={'Leves'}>
                            {tipoVeiculoLeve.map(v => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label={'Medios'}>
                            {tipoVeiculoMedio.map(v => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label={'Pesados'}>
                            {tipoVeiculoPesado.map(v => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs p-4">
                    <label className="label">
                        <p className="label-text font-bold flex w-full relative">
                            Tipo da carroceria
                            <span className={'font-light pl-1'}>(Opcional)</span>
                            <span
                                className="tooltip rounded-full w-6 h-6 inline-block absolute right-0"
                                data-tip="este campo nao e obrigatorio.">
                            <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
                        </p>
                    </label>

                    <p className={'px-2 font-semibold'}>Atual: {frete.carroceriaAlvo === 'x' ? 'indifere' : frete.carroceriaAlvo}</p>

                    <select
                        onChange={e => setEditedFrete((prevState) => {
                            return {
                                ...prevState,
                                carroceriaAlvo: e.target.value
                            }
                        })}
                        disabled={!isEditing}
                        className="select select-bordered"
                        id={'carroceriaAlvo'}
                        name={'carroceriaAlvo'}
                    >
                        <option disabled selected value={''}>
                            Selecione
                        </option>
                        <option value={'apenas cavalo'}>Apenas cavalo</option>
                        <optgroup label={'Abertas'}>
                            {tipoCarroceriaAberta.map(v => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label={'Fechadas'}>
                            {tipoCarroceriaFechada.map(v => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label={'Especiais'}>
                            {tipoCarroceriaEspecial.map(v => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className={'flex gap-4 p-4 justify-center'}>

                <div className="flex max-w-xs items-center justify-center">
                    <div>
                        <label className="text-right basis-3/5 pr-3">
                            <span className="label-text font-bold">Preco por km: <span className={'text-green-700'}>R$</span></span>
                        </label>

                        <input
                            disabled={!isEditing}
                            defaultValue={editedFrete.reaisPorKm === 'x' ? null : editedFrete.reaisPorKm}
                            onChange={e => setEditedFrete((prevState) => {
                                // setPrecoPorKmErro('')
                                return {
                                    ...prevState,
                                    precoPorKm: e.target.value
                                }
                            })}
                            type="number"
                            maxLength={4}
                            className={'w-2/5 input input-bordered'}
                        />
                        <span
                            className="tooltip rounded-full w-6 h-6 inline-block pl-2"
                            data-tip="este campo nao e obrigatorio.">
                                <BsInfoCircleFill className={'w-full h-full text-gray-500'}/>
                        </span>
                    </div>

                    {/*{precoPorKmErro ? (*/}
                    {/*    <p className={'text-red-500'}>*/}
                    {/*        {precoPorKmErro}*/}
                    {/*    </p>*/}
                    {/*) : null}*/}
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
                                        checked={editedFrete.oferecePedagio}
                                        className="checkbox mr-2"
                                        onChange={e => setEditedFrete((prevState) => {
                                            return {
                                                ...prevState,
                                                oferecePedagio: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="label-text">Pedagio</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editedFrete.oferecePernoite}
                                        className="checkbox mr-2"
                                        onChange={e => setEditedFrete((prevState) => {
                                            return {
                                                ...prevState,
                                                oferecePernoite: e.target.checked
                                            }
                                        })}
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
                                        checked={editedFrete.ofereceCarga}
                                        className="checkbox mr-2"
                                        onChange={e => setEditedFrete((prevState) => {
                                            return {
                                                ...prevState,
                                                ofereceCarga: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="label-text">Carga</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editedFrete.ofereceDescarga}
                                        className="checkbox mr-2"
                                        onChange={e => setEditedFrete((prevState) => {
                                            return {
                                                ...prevState,
                                                ofereceDescarga: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="label-text">Descarga</span>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-xs mx-auto flex flex-col items-center">
                <label className="label">
                    <span className="label-text font-bold">Observacoes</span>
                </label>

                <textarea
                    name=""
                    id=""
                    cols="45"
                    rows="7"
                    className={'rounded-md'}
                    value={editedFrete.observacoes}
                    onChange={e => setEditedFrete((prevState) => {
                        setObservacoesErro('')
                        return {
                            ...prevState,
                            observacoes: e.target.value
                        }
                    })}
                />

                {observacoesErro ? (
                    <p className={'text-red-500'}>
                        {observacoesErro}
                    </p>
                ) : null}

            </div>
        </div>
    );
};

export default TomadorFretePage;