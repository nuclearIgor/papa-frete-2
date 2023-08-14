import {tomadorRepository} from "../tomadores/tomadores.repository";
import {ApplicationError} from "../common/applicationError";
import {fretesRepository} from "./fretes.repository";
import {CreateFreteDTO, UpdateFreteDTO} from "./fretes.protocols";

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

async function updateFrete(userId: string, frete: UpdateFreteDTO) {
    try {
        const tomador = await tomadorRepository.getTomadorByUserId(userId)

        if (!tomador || tomador.id !== frete.tomadorId) {
            throw new ApplicationError('sem permissao', 403)
        }

        return await fretesRepository.updateFrete(frete)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, e.statusCode)
    }
}

async function fetchFreteById(freteId: string) {
    try {
        const frete = await fretesRepository.fetchFreteById(freteId)

        if (!frete) {
            throw new ApplicationError('not found', 404)
        }

        return frete
    } catch (e: any) {
        throw new ApplicationError(e.message, e.statusCode)
    }
}

async function deleteFrete(userId: string, freteId: string) {
    try {

        const [tomador, frete] = await Promise.all([
            await tomadorRepository.getTomadorByUserId(userId),
            await fretesRepository.fetchFreteById(freteId)
        ])

        if (!tomador || !frete) {
            throw new ApplicationError('bad request', 400)
        }

        if (tomador.id !== frete.tomadorId) {
            throw new ApplicationError('sem permissao', 403)
        }

        return await fretesRepository.deleteFrete(freteId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, e.statusCode)
    }
}
export const fretesService = {
    createFrete,
    fetchFretesByTomadorId,
    fetchAllFretes,
    updateFrete,
    deleteFrete,
    fetchFreteById
}