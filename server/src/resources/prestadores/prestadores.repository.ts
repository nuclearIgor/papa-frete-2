import { prisma } from "../../../database";
import {
    UpdateDadosDoVeiculoDTO,
    UpdateDadosPessoaisDTO,
    UpdateDadosDoEnderecoDTO,
    CreatePrestadorDTO
} from "./prestadores.protocols";

async function updateDadosPessoais ({nomeCompleto, ddd, celular, categoriaCNH}: UpdateDadosPessoaisDTO, prestadorId: string) {
    return prisma.prestador.update({
        where: {
            id: prestadorId
        },
        data: {
            nome: nomeCompleto,
            ddd,
            telefone: celular,
            categoriaCNH
        },
        // select: {
        //     id: true,
        //     nome: true,
        //     cpf: true,
        //     telefone: true,
        //     cnh: true,
        //     categoriaCNH: true
        // }
    })
}

async function getPrestadorByCpf (cpf: string) {
    return prisma.prestador.findUnique({
        where: {
            cpf
        }
    })
}

async function createPrestador(userId: string, data: CreatePrestadorDTO) {
    return prisma.prestador.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            cpf: data.cpf,
            cnh: data.cnh,
            categoriaCNH: data.categoriaCNH,

            nome: data.nome,
            ddd: data.ddd,
            telefone: data.telefone,

            cep: data.cep,
            estado: data.uf,
            cidade: data.localidade,
            bairro: data.bairro,
            rua: data.logradouro,
            numero: data.numero,
            complemento: data.complemento,

            tipoDoVeiculo: data.tipoVeiculo,
            tipoDaCarroceria: data.tipoCarroceria,
            anoDeFabricacaoDoVeiculo: data.anoDeFabricacao,

        }
    })
}

async function updateDadosDoVeiculo ({tipoVeiculo, tipoCarroceria, anoDeFabricacao}: UpdateDadosDoVeiculoDTO, prestadorId: string){
    return prisma.prestador.update({
        where: {
            id: prestadorId
        },
        data: {
            tipoDoVeiculo: tipoVeiculo,
            tipoDaCarroceria: tipoCarroceria,
            anoDeFabricacaoDoVeiculo: anoDeFabricacao
        },
        // select: {
        //     tipoDoVeiculo: true,
        //     tipoDaCarroceria: true,
        //     anoDeFabricacao: true
        // }
    })
}

async function updateDadosDoEndereco ({uf, numero, cep, bairro, logradouro, localidade, complemento}: UpdateDadosDoEnderecoDTO, prestadorId: string) {
    return prisma.prestador.update({
        where: {
            id: prestadorId
        },
        data: {
            estado: uf,
            cidade: localidade,
            rua: logradouro,
            cep,
            numero,
            bairro,
            complemento
        }
    })
}

async function getPrestadorByUserId(userId: string) {
    return prisma.prestador.findUnique({
        where: {
            userId
        }
    })
}

async function getPrestadorById (prestadorId: string) {
    return prisma.prestador.findUnique({
        where: {
            id: prestadorId
        }
    })
}

async function updateFotoDePerfilData (fotoData: string, prestadorId: string) {
    return prisma.prestador.update({
        where: {
            id: prestadorId
        },
        data: {
            fotoDePerfilData: fotoData,
        }
    })
}

export const prestadorRepository = {
    createPrestador,
    updateDadosPessoais,
    updateDadosDoVeiculo,
    updateDadosDoEndereco,
    getPrestadorByCpf,
    getPrestadorByUserId,
    getPrestadorById,
    updateFotoDePerfilData
}