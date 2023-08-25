import { prisma } from "../../../database";
import {UpdateDadosDoVeiculoDTO, UpdateDadosPessoaisDTO, UpdateDadosDoEnderecoDTO} from "./prestadores.protocols";

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

async function findByCpf(cpf: string) {
    return prisma.prestador.findUnique({
        where: {
            cpf
        }
    })
}

async function createPrestador(userId: string) {
    return prisma.prestador.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            }
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
    findByCpf,
    getPrestadorByUserId,
    getPrestadorById,
    updateFotoDePerfilData
}