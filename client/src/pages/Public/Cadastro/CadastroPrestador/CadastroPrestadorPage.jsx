import { useState } from 'react';
import { baseUrl } from "../../../../App.jsx";
import axios from 'axios';
import toast from 'react-hot-toast';
import DadosDeAutenticacaoForm from '../DadosDeAutenticacaoForm.jsx';
import DadosPessoaisForm from './DadosPessoaisForm.jsx';
import DadosDoVeiculoForm from './DadosDoVeiculoForm.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../../../../components/Loading.jsx";
import EnderecoForm from "../EnderecoForm.jsx";
import FotoDePerfilForm from "../FotoDePerfilForm.jsx";

const CadastroPrestadorPage = () => {
    const [formState, setFormState] = useState(4);
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

    const [enderecoLoading, setEnderecoLoading] = useState(false)

    async function onSubmitDadosDoEndereco(values) {
        console.log(values);

        setLoading(true);

        try {
            const res = await axios.patch(
                `${baseUrl}/api/prestadores/${prestadorData.id}/dados-endereco`,
                values,
            );
            const { prestador } = res.data;
            setPrestadorData({ ...prestador });

            setLoading(false);
            toast.success('sucesso');
            setFormState(3);

        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error('erro');
        }
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
            setFormState(4);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error('erro');
        }
    }

    const onSubmitFotoPerfilForm = async (fotoData) => {
        setLoading(true);

        try {
            const res = await axios.patch(
                // `${baseUrl}/api/prestadores/${prestadorData.id}/foto-perfil`,
                `${baseUrl}/api/prestadores/3dda5046-84e9-4eb2-9980-ceac5aa5f6cf/foto-perfil`,
                {fotoData},
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
        console.log(prestadorData)
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
                <li className={`step ${formState >= 2 ? 'step-primary' : ''}`}>
                    Endereco
                </li>
                <li className={`step ${formState >= 3 ? 'step-primary' : ''} `}>
                    Dados do veiculo
                </li>
                <li className={`step ${formState >= 4 ? 'step-primary' : ''} `}>
                    Foto de perfil
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
                <EnderecoForm
                    prestadorData={prestadorData}
                    onSubmit={onSubmitDadosDoEndereco}
                    handleBack={handleBackButton}
                    loading={enderecoLoading}
                    setLoading={setEnderecoLoading}
                />
            ) : null}
            {formState === 3 ? (
                <DadosDoVeiculoForm
                    onSubmit={onSubmitVeiculoForm}
                    handleBack={handleBackButton}
                    prestadorData={prestadorData}
                />
            ) : null}
            {formState === 4 ? (
                <FotoDePerfilForm
                    onSubmit={onSubmitFotoPerfilForm}
                    handleBack={handleBackButton}
                    prestadorData={prestadorData}
                />
            ) : null}
        </div>
    );
};

export default CadastroPrestadorPage;
