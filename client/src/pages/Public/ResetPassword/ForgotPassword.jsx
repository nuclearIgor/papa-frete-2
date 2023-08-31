import {useCallback, useContext, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {baseUrl} from "../../../App.jsx";

const schema = yup.object({
    email: yup.string().email('email invalido').required('campo obrigatorio'),
})

const ForgotPassword = () => {

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
            const res = await axios.post(`${baseUrl}/api/auth/request-token`, values)
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
                        <span className="label-text">Insira seu email</span>
                    </label>

                    <input
                        name="email"
                        id="email"
                        {...register('email')}

                        type="text"
                        placeholder={"email"}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <p className={'text-red-500'}>
                        {errors?.email?.message}
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

export default ForgotPassword;