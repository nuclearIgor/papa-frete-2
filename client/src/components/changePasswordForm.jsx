import {useState} from "react";
import axios from "axios";
import {baseUrl} from "../App.jsx";
import toast from "react-hot-toast";


const ChangePasswordForm = ({ token }) => {
    const [loading, setLoading] = useState(false);

    const [mostrarSenhas, setMostrarSenhas] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const senhaAtual = document.getElementById('senhaAtual').value
        const novaSenha = document.getElementById('novaSenha').value
        const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value

        if(novaSenha.length < 6) {
            setErrorMsg("minimo 6 caracteres")
            return
        }

        if(novaSenha !== confirmarNovaSenha) {
            setErrorMsg('as senhas devem ser iguais')
            return;
        }

        const values = {
            senhaAtual,
            novaSenha
        }

        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/auth/change-password`, values, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            toast.success("sucesso")
            setLoading(false)
        } catch (e) {
            if(e.response.data.message === 'senha incorreta') {
                toast.error('senha incorreta')
                setLoading(false)
                return
            }
            toast.error('algo deu errado\n tente novamente em alguns minutos')
            setLoading(false)
        }
    }

    return (
        <>
            <form
                onSubmit={onSubmit}
                className={'max-w-md mt-5 mx-auto rounded-box border border-papaYellow bg-base-100 p-10'}
            >
                <div className={'flex justify-end gap-6 items-center max-w-xs mb-2'}>
                    <h4 className={'text-center text-papaBlue'}>Alterar senha</h4>

                    <button className={'btn btn-primary w-24'} type={'submit'}>
                        {loading ? (
                            <span className="loading loading-spinner "></span>
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </div>

                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">Senha atual</span>
                    </label>

                    <input
                        name="senhaAtual"
                        id="senhaAtual"
                        type="password"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">Nova senha</span>
                    </label>

                    <input
                        name="novaSenha"
                        id="novaSenha"
                        type={mostrarSenhas ? 'text' : 'password'}
                        className="input input-bordered w-full max-w-xs"
                    />

                    {errorMsg ?
                    <p className={'text-sm font-light text-red-500'}>{errorMsg}</p> : null}

                    <label className={'text-sm'}>
                    <input type="checkbox" className={'checkbox checkbox-sm m-2'}
                           onChange={(e) => setMostrarSenhas(e.target.checked)}
                    />
                        mostrar senha
                    </label>
                </div>

                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">Repetir senha</span>
                    </label>

                    <input
                        name="confirmarNovaSenha"
                        id="confirmarNovaSenha"
                        type={mostrarSenhas ? 'text' : 'password'}
                        className="input input-bordered w-full max-w-xs"
                        onChange={() => setErrorMsg("")}
                    />
                </div>

            </form>
        </>
    );
};

export default ChangePasswordForm;