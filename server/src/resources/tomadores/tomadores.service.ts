import {RegisterDTO} from "../users/user.protocols";
import {userService} from "../users/users.service";
import {ApplicationError} from "../common/applicationError";
import {tomadorRepository} from "./tomadores.repository";
import { UpdateDadosDaEmpresaDTO, UpdateDadosDoContatoDTO, UpdateDadosDoEnderecoDTO } from './tomadores.protocols';
import {prestadorRepository} from "../prestadores/prestadores.repository";

async function createTomador({email, senha, tipoDeConta}: RegisterDTO) {
    const user = await userService.createUser({email, senha, tipoDeConta})

    try {
        return await tomadorRepository.createTomador(user.id)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function updateDadosDaEmpresa (data: UpdateDadosDaEmpresaDTO, tomadorId: string, userId: string) {
    try {
        const tomador = await tomadorRepository.getTomadorByUserId(userId)

        if(!tomador) {
            throw new ApplicationError('tomador nao existe', 400)
        }

        if (tomador.id !== tomadorId) {
            throw new ApplicationError('proibido', 403)
        }

        return await tomadorRepository.updateDadosDaEmpresa(data, tomadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, e.statusCode)
    }
}

async function updateDadosDoContato (data: UpdateDadosDoContatoDTO, tomadorId: string, userId: string) {
    try {
        const tomador = await tomadorRepository.getTomadorByUserId(userId)

        if(!tomador) {
            throw new ApplicationError('tomador nao existe', 400)
        }

        if (tomador.id !== tomadorId) {
            throw new ApplicationError('proibido', 403)
        }

        return await tomadorRepository.updateDadosDoContato(data, tomadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, e.statusCode)
    }
}

async function updateDadosDoEndereco (data: UpdateDadosDoEnderecoDTO, tomadorId: string, userId: string) {
    try {
        const tomador = await tomadorRepository.getTomadorByUserId(userId)

        if(!tomador) {
            throw new ApplicationError('tomador nao existe', 400)
        }

        if (tomador.id !== tomadorId) {
            throw new ApplicationError('proibido', 403)
        }

        return await tomadorRepository.updateDadosDoEndereco(data, tomadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, e.statusCode)
    }
}

async function getTomadorByuserId (userId: string) {
    try {
        return await tomadorRepository.getTomadorByUserId(userId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}


async function updateFotoDePerfilData (fotoData: string, tomadorId: string) {
    try {
        return await tomadorRepository.updateFotoDePerfilData(fotoData, tomadorId)
    } catch (e) {
        console.log(e)
        return  false
    }
}

export const tomadoresService = {
    createTomador,
    updateDadosDoEndereco,
    updateDadosDaEmpresa,
    updateDadosDoContato,
    getTomadorByuserId,
    updateFotoDePerfilData
}