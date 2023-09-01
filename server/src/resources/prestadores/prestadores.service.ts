import {
    CheckEmailECpfDTO, CreatePrestadorDTO,
    UpdateDadosDoEnderecoDTO,
    UpdateDadosDoVeiculoDTO,
    UpdateDadosPessoaisDTO
} from "./prestadores.protocols";
import {prestadorRepository} from "./prestadores.repository";
import {RegisterDTO} from "../users/user.protocols";
import {userService} from "../users/users.service";
import {ApplicationError} from "../common/applicationError";
import {userRepository} from "../users/users.repository";

async function createPrestador(data: CreatePrestadorDTO) {
    try {
        const user = await userService.createUser({
            email: data.email,
            senha: data.senha,
            tipoDeConta: data.tipoDeConta
        })

        return await prestadorRepository.createPrestador(user.id, data)
    } catch (e: any) {
        throw new ApplicationError(e.message, 400)
    }
}

async function checkEmailECpf ({email, cpf}: CheckEmailECpfDTO) {
    try {
        const [user, prestador] = await Promise.all([
            userRepository.getUserByEmail(email),
            prestadorRepository.getPrestadorByCpf(cpf)
        ])

        if (user) {
            throw new ApplicationError('email ja em uso', 409)
        }

        if (prestador) {
            throw new ApplicationError('cpf ja em uso', 409)
        }

        return null
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
    checkEmailECpf,
    createPrestador,
    updateDadosPessoais,
    updateDadosDoVeiculo,
    getPrestadorByUserId,
    updateDadosDoEndereco,
    updateFotoDePerfilData
}