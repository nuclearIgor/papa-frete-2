import { useState } from 'react';
import { baseUrl } from "../../../../App.jsx";
import axios from 'axios';
import toast from 'react-hot-toast';
import DadosDeAutenticacaoForm from '../DadosDeAutenticacaoForm.jsx';
import DadosPessoaisForm from './DadosPessoaisForm.jsx';
import DadosDoVeiculoForm from './DadosDoVeiculoForm.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../../../../components/Loading.jsx";

const CadastroPrestadorPage = () => {
    const [formState, setFormState] = useState(0);
    const [prestadorData, setPrestadorData] = useState({});

    const [isComingBack, setIsComingBack] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmitAuthForm(values) {
        values['tipoDeConta'] = 'prestador';
        // console.log(values)
        // setFormState(1);
        // return

        setLoading(true);

        try {
            const res = await axios.post(
                `${baseUrl}/api/prestadores/create`,
                values,
            );

            const { prestador } = res.data;
            setPrestadorData({ ...prestador });

            setLoading(false);
            toast.success('sucesso');
            setFormState(1);
        } catch (e) {
            console.log(e.response.data.message);
            if (e.response.data.message === 'email taken') {
                toast.error('email ja registrado');
                setLoading(false);
                return;
            }
            console.log(e);
            setLoading(false);
            toast.error('algo deu errado \n tente novamente em alguns minutos');
        }
    }

    async function onSubmitDadosPessoaisForm(values) {
        if (values.cpf === prestadorData.cpf && isComingBack) {
            setIsComingBack(false);
            setFormState(2);
            return;
        }

        setLoading(true);

        try {
            const res = await axios.patch(
                `${baseUrl}/api/prestadores/${prestadorData.id}/dados-pessoais`,
                values,
            );
            const { prestador } = res.data;
            setPrestadorData({ ...prestador });

            toast.success('sucesso');

            setLoading(false);
            setFormState(2);
        } catch (e) {
            console.log(e);
            toast.error('algo deu errado \n tente novamente em alguns minutos');
        }
        setFormState(2);
    }
    async function onSubmitVeiculoForm(values) {
        setLoading(true);

        try {
            const res = await axios.patch(
                `${baseUrl}/api/prestadores/${prestadorData.id}/dados-veiculo`,
                values,
            );

            const { prestador } = res.data;
            setPrestadorData({ ...prestador });

            setLoading(false);
            toast.success('sucesso');
            navigate('/login');
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error('erro');
        }
    }

    function handleBackButton() {
        setIsComingBack(true);

        if (formState > 0) {
            setFormState(prevState => prevState - 1);
        }
    }

    if (loading) return <LoadingScreen/>

    return (
        // <div className={'container h-screen mx-auto flex flex-col'}>
        <div
            className={
                'container w-full max-w-md flex flex-col justify-center py-12 gap-2 mx-auto full-navbar'
            }
        >
            <ul className="steps py-2 mx-auto border-b border-primary">
                <li className="step step-primary">Login</li>
                <li className={`step ${formState >= 1 ? 'step-primary' : ''}`}>
                    Dados pessoais
                </li>
                <li className={`step ${formState >= 2 ? 'step-primary' : ''} `}>
                    Dados do veiculo
                </li>
            </ul>

            {/*<div className="divider"></div>*/}
            {formState === 0 ? (
                <DadosDeAutenticacaoForm
                    onSubmit={onSubmitAuthForm}
                    loading={loading}
                />
            ) : null}
            {formState === 1 ? (
                <DadosPessoaisForm
                    prestadorData={prestadorData}
                    onSubmit={onSubmitDadosPessoaisForm}
                    handleBack={handleBackButton}
                />
            ) : null}
            {formState === 2 ? (
                <DadosDoVeiculoForm
                    onSubmit={onSubmitVeiculoForm}
                    handleBack={handleBackButton}
                    prestadorData={prestadorData}
                />
            ) : null}
        </div>
    );
};

export default CadastroPrestadorPage;
