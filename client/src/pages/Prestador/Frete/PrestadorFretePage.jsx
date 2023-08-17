import React, {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchFrete, postCandidatura} from "./requests.js";
import LoadingScreen from "../../../components/Loading.jsx";
import {AiOutlineCheck} from "react-icons/ai";
import ConfirmarCandidaturaModal from "./Modal.jsx";
import {brDateToUtc} from "../../../../util/brDateToUtc.js";

const PrestadorFretePage = () => {
    const { freteId } = useParams()

    const { token } = useContext(AuthContext)


    const { data, isLoading } = useQuery({
        queryKey: ['prestador-frete'],
        queryFn: () => fetchFrete(freteId, token)
    })


    const queryClient = useQueryClient()

    const postCandidaturaMutation = useMutation({
        mutationFn: () => postCandidatura(freteId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prestador-frete']})
        }
    })

    const [isOpen, setIsOpen] = useState(undefined)

    const onAccept = () => {
        postCandidaturaMutation.mutate()
        setIsOpen(undefined)
        console.log('accept')
    }

    const { userData } = useContext(AuthContext)


    // useEffect(() => {
    //     // const userData = cookies.get('userData')
    //     // console.log(userData)
    //     console.log('ja candidatou:', jaCandidatou)
    // }, [jaCandidatou])

    if (isLoading) return <LoadingScreen/>

    return (
        <div className={'m-4 p-4 border border-papaYellow rounded-box'}>
            <div className={'flex'}>


                {data?.frete?.Candidatura?.length > 0 ?
                    <div className={'flex flex-col w-full mb-2 justify-center items-center'}>
                        <p>Voce se candidatou em {new Date(data?.frete?.Candidatura[0]?.createdAt).toLocaleString('pt-BR').slice(0, 10)}</p>
                        <div className={'flex flex-col justify-center items-center'}>
                            { data?.frete?.Candidatura[0]?.aceita === null ?
                                <div className={'flex flex-col justify-center items-center'}>
                                    <p className="font-semibold">status</p>
                                    <p className={'badge badge-info w-24 h-10 font-semibold'}>pendente</p>
                                </div> : null
                            }
                            { data?.frete?.Candidatura[0]?.aceita === true ?
                                <>
                                    <p className={'badge badge-success w-24 h-10 font-semibold'}>aceita</p>
                                    <p>aceita em:
                                        <span className={'ml-1'}>
                                        {new Date(data?.frete?.Candidatura[0]?.aceitaEm).toLocaleString('pt-BR').slice(0, 10)}
                                        {/*{new Date(brDateToUtc(data?.frete?.Candidatura[0]?.aceitaEm)).toLocaleString('pt-BR').slice(0, 10)}*/}
                                    </span>
                                    </p>
                                    <p className={'font-light'}>Aguarde o tomador do frete entrar em contato</p>
                                </>
                                : null
                            }
                            { data?.frete?.Candidatura[0]?.aceita === false ?
                                <div className={'flex flex-col justify-center items-center'}>
                                    <span className={'badge badge-error w-24 h-10 font-semibold'}>recusada</span>
                                    <p>recusada em:
                                        <span className={'ml-1'}>
                                        {new Date(data?.frete?.Candidatura[0]?.aceitaEm).toLocaleString('pt-BR').slice(0, 10)}
                                     </span>
                                    </p>
                                    <p className={'font-light'}>Voce nao pode se recandidatar</p>
                                </div>
                                : null
                            }

                        </div>
                    </div>
                    :
                    <ConfirmarCandidaturaModal
                        buttonText={'Candidatar'}
                        isOpen={isOpen}
                        setOpen={setIsOpen}
                        onAccept={onAccept}
                    />
                }

                {/*<button className={'btn self-end bg-papaYellow'}>Candidatar</button>*/}
            </div>
            <h4 className={'text-center flex-1 mt-2 pt-2 border-t-2 border-papaYellow'}>
                Empresa:
                <span className={'ml-1 font-bold'}>
                        {data?.frete?.Tomador.nomeFantasia}
                    </span>

            </h4>

            <div className={'flex gap-4 justify-center py-2 max-w-sm mx-auto'}>

                <div className={'flex flex-col'}>
                    <p className={'font-semibold'}>Origem</p>
                    <p>{data?.frete?.cidadeOrigem}-{data?.frete?.ufOrigem}</p>
                </div>

                <div className={'flex flex-col'}>
                    <p className={'font-semibold'}>Destino</p>
                    <p>{data?.frete?.cidadeDestino}-{data?.frete?.ufDestino}</p>
                </div>
            </div>

            <div className={'flex gap-4 justify-center py-2 max-w-sm mx-auto'}>
                <div className={'flex flex-col'}>
                    <p className={'font-semibold'}>Coleta</p>
                    {data?.frete?.coleta === 'janela' ?
                    <p>{data?.frete?.janelaColeta}</p>
                        :
                    <p>{data?.frete?.coleta}</p>
                    }
                </div>

                <div className={'flex flex-col'}>
                    <p className={'font-semibold'}>Entrega</p>
                    {data?.frete?.entrega === 'janela' ?
                        <p>{data?.frete?.janelaEntrega}</p>
                        :
                        <p>{data?.frete?.entrega}</p>
                    }
                </div>
            </div>


            <div className={'flex gap-4 justify-center py-2 max-w-sm mx-auto'}>

                <div className={'flex flex-col text-center'}>
                    <p className={'font-semibold'}>Veiculo preferencial</p>

                    {data?.frete?.veiculoAlvo === 'x'
                    ?
                    <p className={'font-light'}>indifere</p>
                    :
                    <p>{data?.frete?.veiculoAlvo}</p>
                    }
                </div>

                <div className={'flex flex-col text-center'}>
                    <p className={'font-semibold'}>Carroceria preferencial</p>

                    {data?.frete?.carroceriaAlvo === 'x'
                    ?
                    <p className={'font-light'}>indifere</p>
                    :
                    <p>{data?.frete?.carroceriaAlvo}</p>
                    }
                </div>
            </div>

            <div className={'flex flex-col items-center'}>
                <p className={'font-bold mb-2'}>Oferece:</p>

                <div className={'flex gap-2 flex-wrap'}>
                    {data?.frete?.reaisPorKm === 'x' || !data?.frete?.reaisPorKm ? null :

                        <span className={'badge badge-success'}>
                                    R$ {data?.frete?.reaisPorKm}/km
                                </span>
                    }

                    {data?.frete?.oferecePernoite ?
                        <span className={'badge badge-success'}>
                                    <AiOutlineCheck/>
                                    Pernoite
                                </span> : null
                    }
                    {data?.frete?.oferecePedagio ?
                        <span className={'badge badge-success'}>
                                    <AiOutlineCheck/>
                                    Pedagio
                                </span> : null
                    }
                    {data?.frete?.ofereceCarga ?
                        <span className={'badge badge-success'}>
                                    <AiOutlineCheck/>
                                    Carga
                                </span> : null
                    }
                    {data?.frete?.ofereceDescarga ?
                        <span className={'badge badge-success'}>
                                    <AiOutlineCheck/>
                                    Descarga
                                </span> : null
                    }
                </div>
            </div>

            <div className={'flex flex-col w-1/2 my-4 pt-2 mx-auto items-center border border-papaBlue rounded-box'}>
                <p className={'font-semibold'}>Observacoes</p>
                <p className={'p-2 break-all h-fit '}>{data?.frete?.observacoes}</p>
            </div>
        </div>
    );
};

export default PrestadorFretePage;