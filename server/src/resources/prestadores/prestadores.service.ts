import {UpdateDadosDoVeiculoDTO, UpdateDadosPessoaisDTO} from "./prestadores.protocols";
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

async function updateDadosPessoais(data: UpdateDadosPessoaisDTO, prestadorId: string) {
    const prestadorByCpf = await prestadorRepository.findByCpf(data.cpf)
    if (prestadorByCpf) {
        throw new ApplicationError('cpf taken', 409)
    }

    try {
        return await prestadorRepository.updateDadosPessoais(data, prestadorId)
    } catch (e: any) {
        console.log(e)
        throw new ApplicationError(e.message, 400)
    }
}

async function updateDadosDoVeiculo (data: UpdateDadosDoVeiculoDTO, prestadorId: string) {
    try {
        return await prestadorRepository.updateDadosDoVeiculo(data, prestadorId)
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

export const prestadoresService = {
    createPrestador,
    updateDadosPessoais,
    updateDadosDoVeiculo,
    getPrestadorByUserId
}