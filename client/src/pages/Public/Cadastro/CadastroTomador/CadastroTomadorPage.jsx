import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from "../../../../App.jsx";
import DadosDoEnderecoForm from '../EnderecoForm.jsx';
import DadosDoContatoForm from './DadosDoContatoForm.jsx';
import DadosDaEmpresaForm from './DadosDaEmpresaForm.jsx';
import DadosDeAutenticacaoForm from '../DadosDeAutenticacaoForm.jsx';
import { useNavigate } from 'react-router-dom';

const CadastroTomadorPage = () => {
    const [formState, setFormState] = useState(0);
    const [loading, setLoading] = useState(false);

    const [tomadorData, setTomadorData] = useState({});
    const [isComingBack, setIsComingBack] = useState(false);

    const navigate = useNavigate();

    async function onSubmitAuthForm(values) {
        values['tipoDeConta'] = 'tomador';

        setLoading(true);

        try {
            const res = await axios.post(
                `${baseUrl}/api/tomadores/create`,
                values,
            );

            const { tomador } = res.data;
            setTomadorData({ ...tomador });

            setFormState(1);
            setLoading(false);
            toast.success('sucesso');
        } catch (e) {
            if (e.response.data.message === 'email taken') {
                toast.error('email ja registrado');
                setLoading(false);
                return;
            }
            console.log(e);
            setLoading(false);
            toast.error('erro');
        }
    }

    async function onSubmitDadosDaEmpresa(values) {
        // console.log('values:\n', values.cnpj, '\n', 'tomador:\n', tomadorData.cnpj)

        if (values.cnpj === tomadorData.cnpj && isComingBack) {
            setIsComingBack(false);
            setFormState(2);
            return;
        }

        setLoading(true);

        try {
            const res = await axios.patch(
                `${baseUrl}/api/tomadores/${tomadorData.id}/dados-empresa`,
                values,
            );
            const { tomador } = res.data;
            setTomadorData({ ...tomador });

            setLoading(false);
            toast.success('sucesso');
            setFormState(2);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error('erro');
        }
    }

    async function onSubmitDadosDoContato(values) {
        console.log(values);

        setLoading(true);

        try {
            const res = await axios.patch(
                `${baseUrl}/api/tomadores/${tomadorData.id}/dados-contato`,
                values,
            );
            const { tomador } = res.data;
            setTomadorData({ ...tomador });

            setLoading(false);
            toast.success('sucesso');
            setFormState(3);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error('erro');
        }
    }

    async function onSubmitDadosDoEndereço(values) {
        console.log(values);

        setLoading(true);

        try {
            const res = await axios.patch(
                `${baseUrl}/api/tomadores/${tomadorData.id}/dados-endereco`,
                values,
            );
            const { tomador } = res.data;
            setTomadorData({ ...tomador });

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
            setFormState(formState - 1);
        }
    }

    return (
        <div className={'container h-screen mx-auto flex flex-col'}>
            <ul className="steps pt-6 md:w-3/6 mx-auto">
                <li className="step step-primary">Login</li>
                <li className={`step ${formState >= 1 ? 'step-primary' : ''}`}>
                    Dados da empresa
                </li>
                <li className={`step ${formState >= 2 ? 'step-primary' : ''} `}>
                    Dados do contato
                </li>
                <li className={`step ${formState >= 3 ? 'step-primary' : ''} `}>
                    Dados do endereço
                </li>
            </ul>

            <div className="divider"></div>
            {formState === 0 ? (
                <DadosDeAutenticacaoForm onSubmit={onSubmitAuthForm} />
            ) : null}
            {formState === 1 ? (
                <DadosDaEmpresaForm
                    tomadorData={tomadorData}
                    onSubmit={onSubmitDadosDaEmpresa}
                    handleBack={handleBackButton}
                />
            ) : null}
            {formState === 2 ? (
                <DadosDoContatoForm
                    tomadorData={tomadorData}
                    onSubmit={onSubmitDadosDoContato}
                    handleBack={handleBackButton}
                />
            ) : null}
            {formState === 3 ? (
                <DadosDoEnderecoForm
                    onSubmit={onSubmitDadosDoEndereço}
                    handleBack={handleBackButton}
                    loading={loading}
                    setLoading={setLoading}
                />
            ) : null}
        </div>
    );
};

export default CadastroTomadorPage;
