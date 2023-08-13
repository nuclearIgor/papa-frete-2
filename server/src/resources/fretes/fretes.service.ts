import {tomadorRepository} from "../tomadores/tomadores.repository";
import {ApplicationError} from "../common/applicationError";
import {fretesRepository} from "./fretes.repository";
import {CreateFreteDTO} from "./fretes.protocols";

async function createFrete(data: CreateFreteDTO, userId: string) {
    if (!data['veiculoAlvo']) {
        data['veiculoAlvo'] = 'x'
    }
    if (!data['carroceriaAlvo']) {
        data['carroceriaAlvo'] = 'x'
    }

    try {
        const tomador = await tomadorRepository.getTomadorByUserId(userId)
        console.log(userId);
        if (!tomador) {
            throw new ApplicationError("tomador not found", 400)
        }

        return await fretesRepository.createFrete(data, tomador.id)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function fetchFretesByTomadorId(userId: string) {
    try {
        const tomador = await tomadorRepository.getTomadorByUserId(userId)
        if (!tomador) {
            throw new ApplicationError("tomador not found", 400)
        }

        return await fretesRepository.fetchFretesByTomadorId(tomador.id)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function fetchAllFretes() {
    try {
        return await fretesRepository.fetchAllFretes()
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}
export const fretesService = {
    createFrete,
    fetchFretesByTomadorId,
    fetchAllFretes
}