import React, {useRef, useState} from 'react';
import {BsPersonBoundingBox} from "react-icons/bs";

const FotoDePerfilForm = ({onSubmit, prestadorData, handleBack}) => {
    const [fileValue, setFileValue] = useState(null)

    const profilePicRef = useRef()

    function readProfilePic() {
        const file = profilePicRef.current.files[0];

        console.log(file)
        //  encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
                .replace("data:", "")
                .replace(/^.+,/, "")
            // alert(base64String)
            setFileValue(base64String)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(fileValue)
    }

    return (
        <div
            className={'max-w-md w-10/12 mt-5 mx-auto bg-gray-300 rounded-box p-10 border border-papaYellow'}
        >
            <div className={'m-2 p-2 flex flex-col justify-center items-center'}>
                {fileValue ?
                    <img
                        className={'h-40 w-68 rounded-full'}
                        src={`data:image/png;base64, ${fileValue}`}
                        alt=""
                    />
                    :
                    <>
                        <BsPersonBoundingBox
                            className={'h-40 w-40 rounded-full'}
                        />
                        <p className={'font-light text-xs pt-2'}>escolha um arquivo e sua foto aparecera aqui</p>
                    </>

                }
            </div>

            <form
                onSubmit={handleSubmit}
            >

                <div className="form-control">
                    <input
                        ref={profilePicRef}
                        type="file"
                        placeholder={'oi'}
                        accept={"image/png, image/jpeg"}
                        onChange={() => setFileValue(readProfilePic())}
                        className={'file-input file-input-bordered'}
                    />
                    <label htmlFor="" className="label">
                        <span className="label-text">Selecione um arquivo</span>
                    </label>
                </div>

                <div className={'flex items-center pt-3 h-24'}>
                    <div className={'flex-1 h-full'}>
                        <button className={'btn btn-primary hover:opacity-60 w-24'}>Voltar</button>
                    </div>

                    <div className={'flex flex-col h-full justify-between items-end'}>
                        <button className={'btn btn-primary hover:opacity-60 w-24'}>Salvar</button>
                        <p className={'link w-full text-center hover:opacity-50 hover:text-papaBlue '}>fazer depois</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FotoDePerfilForm;