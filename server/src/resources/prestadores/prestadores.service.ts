import {UpdateDadosDoEnderecoDTO, UpdateDadosDoVeiculoDTO, UpdateDadosPessoaisDTO} from "./prestadores.protocols";
import {prestadorRepository} from "./prestadores.repository";
import {RegisterDTO} from "../users/user.protocols";
import {userService} from "../users/users.service";
import {ApplicationError} from "../common/applicationError";

async function createPrestador({email, senha, tipoDeConta}: RegisterDTO) {
    const user = await userService.createUser({email, senha, tipoDeConta})

    try {
        return await prestadorRepository.createPrestador(user.id)
    } catch (e: any) {
        throw new ApplicationError(e.message, 400)
    }
}

async function updateDadosPessoais(data: UpdateDadosPessoaisDTO, prestadorId: string, userId: string) {

    try {
        const prestador = await prestadorRepository.getPrestadorByUserId(userId)
        console.log(prestador)
        if (!prestador){
            throw new ApplicationError('prestador nao existe', 400)
        }

        if (prestador.id !== prestadorId) {
            throw new ApplicationError('proibido', 403)
        }

        return await prestadorRepository.updateDadosPessoais(data, prestadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, e.statusCode)
    }
}

async function updateDadosDoVeiculo (data: UpdateDadosDoVeiculoDTO, prestadorId: string, userId: string) {
    try {
        const prestador = await prestadorRepository.getPrestadorByUserId(userId)
        if (!prestador){
            throw new ApplicationError('prestador nao existe', 400)
        }

        if (prestador.id !== prestadorId) {
            throw new ApplicationError('proibido', 403)
        }

        return await prestadorRepository.updateDadosDoVeiculo(data, prestadorId)
    } catch (e) {
        console.log(e)
        return  false
    }
}

async function updateDadosDoEndereco (data: UpdateDadosDoEnderecoDTO, prestadorId: string, userId: string) {
    try {
        const prestador = await prestadorRepository.getPrestadorByUserId(userId)
        if (!prestador){
            throw new ApplicationError('prestador nao existe', 400)
        }

        if (prestador.id !== prestadorId) {
            throw new ApplicationError('proibido', 403)
        }

        return await prestadorRepository.updateDadosDoEndereco(data, prestadorId)
    } catch (e) {
        console.log(e)
        return  false
    }
}

async function getPrestadorByUserId (userId: string) {
    try {
        return await prestadorRepository.getPrestadorByUserId(userId)
    } catch (e) {
        console.log(e)
        return  false
    }
}

async function updateFotoDePerfilData (fotoData: string, prestadorId: string) {
    try {
        return await prestadorRepository.updateFotoDePerfilData(fotoData, prestadorId)
    } catch (e) {
        console.log(e)
        return  false
    }
}

export const prestadoresService = {
    createPrestador,
    updateDadosPessoais,
    updateDadosDoVeiculo,
    getPrestadorByUserId,
    updateDadosDoEndereco,
    updateFotoDePerfilData
}