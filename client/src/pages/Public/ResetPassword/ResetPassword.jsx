import {useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {baseUrl} from "../../../App.jsx";

const schema = yup.object({
    senha: yup.string().min(6).required('campo obrigatorio'),
})

const ResetPassword = () => {

    const [searchParams , setSearchParams] = useSearchParams()

    const [loading, setLoading ] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    })

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            const data = {
                token: searchParams.get('token'),
                userId: searchParams.get('id'),
                password: values.senha
            }

            const res = await axios.post(`${baseUrl}/api/auth/reset-password`, data)

            setLoading(false)
            toast.success('sucesso')
        } catch (e) {
            setLoading(false)
            toast.error(e?.response?.data?.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'max-w-md mt-5 mx-auto rounded-box bg-gray-300 p-10'}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nova senha</span>
                    </label>

                    <input
                        name="senha"
                        id="senha"
                        {...register('senha')}

                        type="password"
                        placeholder={"senha"}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <p className={'text-red-500'}>
                        {errors?.senha?.message}
                    </p>

                </div>

                <div className="flex mt-4 justify-center">
                    <button className={'btn btn-primary w-24'} type={"submit"}>
                        {loading ?
                            <span className="loading loading-spinner "></span>
                            :
                            "Enviar"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;