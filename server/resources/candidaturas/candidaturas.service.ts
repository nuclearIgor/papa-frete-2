import {prestadorRepository} from "../prestadores/prestadores.repository";
import {ApplicationError} from "../common/applicationError";
import {candidaturasRepository} from "./candidaturas.repository";
import {tomadorRepository} from "../tomadores/tomadores.repository";
import {fretesRepository} from "../fretes/fretes.repository";

async function createCandidatura(freteId: string, userId: string) {
    try {
        const prestador = await prestadorRepository.getPrestadorByUserId(userId)

        if (!prestador) {
            throw new ApplicationError("prestador not found", 400)
        }

        const candidaturas = await candidaturasRepository.getCandidaturaByFreteAndTomadorId(freteId, prestador.id)
        if (candidaturas) {
            throw new ApplicationError("ja existe candidatura", 409)
        }

        return await candidaturasRepository.createCandidatura({freteId, prestadorId: prestador.id})
    } catch (e: any) {
        // console.log(e);
        throw new ApplicationError(e.message, 400)
    }
}

async function getCandidaturasByFreteId (freteId: string, userId: string) {

    const [tomador, frete] = await Promise.all([tomadorRepository.getTomadorByUserId(userId), fretesRepository.fetchFreteById(freteId)])

    if(!tomador) {
        throw new ApplicationError('tomador not found', 400)
    }

    if(!frete) {
        throw new ApplicationError('frete not found', 400)
    }

    if(frete.tomadorId !== tomador.id) {
        throw new ApplicationError('wrong tomador', 403)
    }

    return await candidaturasRepository.getCandidaturasByFreteId(freteId)
}

async function getCandidaturasByPrestadorId (userId: string) {
    try {
        const user = await prestadorRepository.getPrestadorByUserId(userId)
        if (!user) {
            throw new ApplicationError('wrong user', 400)
        }

        return await candidaturasRepository.getCandidaturasByPrestadorId(user.id)
    } catch (e: any) {
        throw new ApplicationError(e.message, e.statusCode || 400)
    }
}

export const candidaturasService = {
    createCandidatura,
    getCandidaturasByFreteId,
    getCandidaturasByPrestadorId
}