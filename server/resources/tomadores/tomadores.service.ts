import {RegisterDTO} from "../users/user.protocols";
import {userService} from "../users/users.service";
import {ApplicationError} from "../common/applicationError";
import {tomadorRepository} from "./tomadores.repository";
import { UpdateDadosDaEmpresaDTO, UpdateDadosDoContatoDTO, UpdateDadosDoEnderecoDTO } from './tomadores.protocols';

async function createTomador({email, senha, tipoDeConta}: RegisterDTO) {
    const user = await userService.createUser({email, senha, tipoDeConta})

    try {
        return await tomadorRepository.createTomador(user.id)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function updateDadosDaEmpresa (data: UpdateDadosDaEmpresaDTO, tomadorId: string) {
    const tomadorByCnpj = await tomadorRepository.findByCnpj(data.cnpj)
    if (tomadorByCnpj) {
        throw new ApplicationError('cnpj taken', 409)
    }

    try {
        return await tomadorRepository.updateDadosDaEmpresa(data, tomadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function updateDadosDoContato (data: UpdateDadosDoContatoDTO, tomadorId: string) {
    try {
        return await tomadorRepository.updateDadosDoContato(data, tomadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function updateDadosDoEndereco (data: UpdateDadosDoEnderecoDTO, tomadorId: string) {
    try {
        return await tomadorRepository.updateDadosDoEndereco(data, tomadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

export const tomadoresService = {
    createTomador,
    updateDadosDoEndereco,
    updateDadosDaEmpresa,
    updateDadosDoContato
}