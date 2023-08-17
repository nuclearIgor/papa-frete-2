import {tomadorRepository} from "../tomadores/tomadores.repository";
import {ApplicationError} from "../common/applicationError";
import {fretesRepository} from "./fretes.repository";
import {CreateFreteDTO, UpdateFreteDTO} from "./fretes.protocols";
import {prestadorRepository} from "../prestadores/prestadores.repository";

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
// ufOrigem: string | undefined,
//     cidadeOrigem: string | undefined,
//     cidadeDestino: string | undefined,
//     ufDestino: string | undefined,
//     startDatecoletaLivre: string | undefined
async function fetchAllFretes(
        ufOrigem: string | undefined,
        cidadeOrigem: string | undefined,
        cidadeDestino: string | undefined,
        ufDestino: string | undefined,
        startDate: string | undefined,
        coletaLivre: string | undefined
) {
    console.log('ufo', [!!ufOrigem, !!cidadeOrigem, !!ufDestino, !!cidadeDestino])
    try {

        // caso de somente ufOrigem na query
        if(Boolean(ufOrigem) && !Boolean(cidadeOrigem) && !Boolean(ufDestino) && !Boolean(cidadeDestino)){
            console.log('case 1', )
            return await fretesRepository.fetchFretesByUfOrigem(String(ufOrigem))
        }
        // caso ufOrigem e cidadeOrigem na query
        else if(Boolean(ufOrigem) && Boolean(cidadeOrigem) && !Boolean(ufDestino) && !Boolean(cidadeDestino)){
            console.log('case 2', )
            return await fretesRepository.fetchFretesByUfOrigemECidadeOrigem(String(ufOrigem), String(cidadeOrigem))
        }
        // caso ufOrigem, cidadeOrigem, e ufDestino na query
        else if(Boolean(ufOrigem) && Boolean(cidadeOrigem) && !Boolean(ufDestino) && !Boolean(cidadeDestino)){
            console.log('case 3', )
            return await fretesRepository.fetchFretesByUfOrigemCidadeOrigemEUfDestino(String(ufOrigem), String(cidadeOrigem), String(ufDestino))
        }
        // caso ufOrigem, cidadeOrigem, ufDestino e cidadeDestino na query
        else if(Boolean(ufOrigem) && Boolean(cidadeOrigem) && !Boolean(ufDestino) && !Boolean(cidadeDestino)){
            console.log('case 4', )
            return await fretesRepository.fetchFretesByUfOrigemCidadeOrigemUfDestinoECidadeDestino(
                String(ufOrigem), String(cidadeOrigem), String(ufDestino), String(cidadeDestino))
        }


        // caso ufOrigem e ufDestino  na query
        else if(Boolean(ufOrigem) && !Boolean(cidadeOrigem) && Boolean(ufDestino) && !Boolean(cidadeDestino)){
            console.log('case 5', )
            return await fretesRepository.fetchFretesByUfOrigemEUfDestino(String(ufOrigem),  String(ufDestino))
        }  // caso ufOrigem, ufDestino cidadeDestino na query
        else if(Boolean(ufOrigem) && !Boolean(cidadeOrigem) && Boolean(ufDestino) && Boolean(cidadeDestino)){
            console.log('case 6', )
            return await fretesRepository.fetchFretesByUfOrigemUfDestinoECidadeDestino(String(ufOrigem),  String(ufDestino), String(cidadeDestino))
        }


        // caso ufDestino e cidadeDestino na query
        else if(!Boolean(ufOrigem) && !Boolean(cidadeOrigem) && Boolean(ufDestino) && Boolean(cidadeDestino)){
            console.log('case 7', )
            return await fretesRepository.fetchFretesByUfDestinoECidadeDestino(String(ufDestino), String(cidadeDestino))
        } // caso ufDestino na query
        else if(!Boolean(ufOrigem) && !Boolean(cidadeOrigem) && Boolean(ufDestino) && !Boolean(cidadeDestino)){
            console.log('case 8', )
            return await fretesRepository.fetchFretesByUfDestino(String(ufDestino))
        }



        console.log('default')
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

async function fetchFreteById(freteId: string, userId: string, tipoDeConta: string) {
    try {
        let frete

        if (tipoDeConta === 'prestador') {
            const prestador = await prestadorRepository.getPrestadorByUserId(userId)
            if(!prestador) {
                throw new ApplicationError('wrong prestador', 400)
            }

            frete = await fretesRepository.fetchFreteByIdPrestador(freteId, prestador.id)
        }

        if (tipoDeConta === 'tomador') {
            const tomador = await tomadorRepository.getTomadorByUserId(userId)
            if(!tomador) {
                throw new ApplicationError('wrong tomador', 400)
            }

            frete = await fretesRepository.fetchFreteByIdTomador(freteId)
        }

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