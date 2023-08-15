import React, {useContext, useEffect, useState} from 'react';
import ColetaEntregaForm from "./ColetaEntregaForm.jsx";
import OrigemDestinoForm from "./OrigemDestinoForm.jsx";
import VeiculoCarroceriaPreferencialForm from "./VeiculoCarroceriaPreferencialForm.jsx";
import LoadingScreen from "../../../components/Loading.jsx";
import OfertasObservacoesForm from "./OfertasObservacoesForm.jsx";
import Revisao from "./Revisao.jsx";
import axios from "axios";
import {baseUrl} from "../../../App.jsx";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postNovoFrete} from "./requests.js";
import {useNavigate} from "react-router-dom";

const NovoFretePage = () => {
    const [frete, setFrete] = useState({
        observacoes: '',
        ufOrigem: 'estado',
        ufDestino: 'estado',
        reaisPorKm: 'x'
    })

    const { token } = useContext(AuthContext)

    useEffect(() => {
        console.log('frete: \n', frete);
    }, [frete]);

    const [formState, setFormState] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleOrigemDestinoSubmit = (values) => {
        setFrete((frete ) => {
            return {
                ...frete,
                ...values
            }
        })
        setFormState(1)
    }

    const handleColetaEntregaSubmit = (values) => {
        setFrete((frete ) => {
            return {
                ...frete,
                ...values
            }
        })
        setFormState(2)
    }

    const handleVeiculoCarroceriaSubmit = (values) => {
        setFrete((frete ) => {
            return {
                ...frete,
                ...values
            }
        })
        setFormState(3)
    }

    const handleObservacoesEOfertaSubmit = (values) => {
        setFrete((frete ) => {
            return {
                ...frete,
                ...values
            }
        })
        setFormState(4)
    }

    const queryClient = useQueryClient()

    const postNovoFreteMutation = useMutation({
        mutationFn: () => postNovoFrete(frete, token),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meus-fretes']})
        }
    })

    const navigate = useNavigate()

    const onSubmit = async () => {
        setLoading(true)
        console.log('frete: \n', frete)

        postNovoFreteMutation.mutate()

        setLoading(false)
        navigate('/meus-fretes')
    }

    function handleBackButton() {
        // console.log(formState);

        if (formState > 0) {
            setFormState(formState - 1);
        }
    }

    if ( loading ) return <LoadingScreen/>

    return (
        <div className={'container h-screen mx-auto flex flex-col items-center'}>
            <ul className="steps pt-6 mx-auto">
                <li className="step step-primary">
                    Coleta e entrega
                </li>
                <li className={`step ${formState >= 1 ? 'step-primary' : ''}`}>
                    Datas
                </li>
                <li className={`step ${formState >= 2 ? 'step-primary' : ''} `}>
                    Carga e veiculo
                </li>
                <li className={`step ${formState >= 3 ? 'step-primary' : ''} `}>
                    Ofertas e observacoes
                </li>
                <li className={`step ${formState >= 4 ? 'step-primary' : ''} `}>
                    Revisar
                </li>
            </ul>

            <div className="divider"></div>

            <div className={'w-full'}>

            {formState === 0 ? (
                <OrigemDestinoForm onSubmit={handleOrigemDestinoSubmit} frete={frete} loading={loading}/>
            ) : null}

            {formState === 1 ? (
                <ColetaEntregaForm onSubmit={handleColetaEntregaSubmit} handleBack={handleBackButton} frete={frete} loading={loading}/>
            ) : null}


            {formState === 2 ? (
                <VeiculoCarroceriaPreferencialForm onSubmit={handleVeiculoCarroceriaSubmit} handleBack={handleBackButton} frete={frete} loading={loading}/>
            ) : null}


            {formState === 3 ? (
                <OfertasObservacoesForm
                    onSubmit={handleObservacoesEOfertaSubmit}
                    frete={frete}
                    loading={loading}
                    handleBack={handleBackButton}
                />
            ) : null}


            {formState === 4 ? (
                // <Revisao onSubmit={handleOrigemDestinoSubmit} frete={{
                //     observacoes: "asdhfjgkhjkm",
                //     ufOrigem: "PE",
                //     ufDestino: "PR",
                //     cidadeOrigem: "Araçoiaba",
                //     cidadeDestino: "Antônio Olinto",
                //     coleta: "janela",
                //     janelaColeta: "12/08/2023",
                //     entrega: "D+11",
                //     janelaEntrega: "x",
                //     tipoDeCarga: "graos",
                //     veiculoAlvo: "x",
                //     carroceriaAlvo: "x",
                //     ofereceCarga: true,
                //     ofereceDescarga: true,
                //     oferecePedagio: true,
                //     oferecePernoite: true,
                //     reaisPorKm: 8,
                // }} handleBack={handleBackButton}
                // />
                <Revisao
                    onSubmit={onSubmit}
                    frete={frete}
                    handleBack={handleBackButton}
                />
            ) : null}

            </div>
        </div>

        // <div>
        //     <VeiculoCarroceriaPreferencialForm/>
        //     <OrigemDestinoForm/>
        //     <ColetaEntregaForm/>
        // </div>
    );
};

export default NovoFretePage;