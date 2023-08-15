import {BsHandThumbsDown, BsHandThumbsUp} from "react-icons/bs";
import {RxAvatar} from "react-icons/rx";
import {useContext, useState} from "react";
import AceitarCandidaturaModal from "./AceitarCandidaturaModal.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCandidaturaAceitaRequest, updateCandidaturaRecusadaRequest} from "./requests.js";
import {AuthContext} from "../../../contexts/AuthContext/AuthContextProvider.jsx";

const CandidaturaPendenteCard = ({candidatura}) => {

    const [isOpen, setOpen] = useState(undefined)

    const queryClient = useQueryClient()

    const { token } = useContext(AuthContext)

    const updateCandidaturaAceita = useMutation({
        mutationFn: () => updateCandidaturaAceitaRequest(candidatura.id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tomador-frete']})
        }
    })
    const updateCandidaturaRecusada = useMutation({
        mutationFn: () => updateCandidaturaRecusadaRequest(candidatura.id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tomador-frete']})
        }
    })
    const onAccept = () => {
        updateCandidaturaAceita.mutate()
        setOpen(undefined)
    }

    return (
        <div className={'flex w-10/12 mx-auto border border-gray-300 rounded-sm items-center my-2'}>

            <div className={'flex items-center p-4 basis-1/3'}>
                <RxAvatar className={'h-16 w-16 mr-2'}/>
                <p className={'font-bold text-2xl'}>{candidatura.Prestador.nome}</p>
            </div>

            <div className={'flex gap-1 items-center p-4 basis-1/3'}>
                <p className={'font-light'}>Tipo de veiculo:</p>
                <p className={'font-bold'}>
                    {candidatura.Prestador.tipoDoVeiculo}/{candidatura.Prestador.tipoDaCarroceria}</p>
            </div>

            <div className={'basis-1/3 flex justify-evenly'}>
                <button className={'btn bg-papaBlue text-white'}>
                    <BsHandThumbsDown
                        className={'h-8 w-8'}
                />
                    Recusar
                </button>

                <AceitarCandidaturaModal
                    isOpen={isOpen}
                    setOpen={setOpen}
                    onAccept={onAccept}
                />

                {/*<button*/}
                {/*    className={'btn btn-primary hover:opacity-30'}*/}
                {/*>*/}
                {/*    <BsHandThumbsUp*/}
                {/*        className={'h-8 w-8'}*/}
                {/*    />*/}
                {/*    Aceitar*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default CandidaturaPendenteCard;