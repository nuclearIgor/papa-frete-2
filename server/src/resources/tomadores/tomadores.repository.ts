import { prisma } from "../../../database";
import { UpdateDadosDaEmpresaDTO, UpdateDadosDoContatoDTO, UpdateDadosDoEnderecoDTO } from './tomadores.protocols';

async function createTomador(userId: string) {
    return prisma.tomador.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

async function updateDadosDaEmpresa ({cnpj, nomeFantasia, ramo}: UpdateDadosDaEmpresaDTO, tomadorId: string) {
    return prisma.tomador.update({
        where: {
            id: tomadorId
        },
        data: {
            cnpj,
            nomeFantasia,
            ramo
        }
    })
}

async function updateDadosDoEndereco ({uf, numero, cep, bairro, logradouro, localidade, complemento}: UpdateDadosDoEnderecoDTO, tomadorId: string) {
    return prisma.tomador.update({
        where: {
            id: tomadorId
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

async function updateDadosDoContato ({ddd, celular, nomeDoContato}: UpdateDadosDoContatoDTO, tomadorId: string) {
    return prisma.tomador.update({
        where: {
            id: tomadorId
        },
        data: {
            ddd,
            telefone: celular,
            nomeDoContato
        }
    })
}

async function findByCnpj(cnpj: string) {
    return prisma.tomador.findUnique({
        where: {
            cnpj
        }
    })
}

async function getTomadorByUserId(userId: string) {
    return prisma.tomador.findFirst({
        where: {
           user: {
               id: userId
           }
        }
    })
}

async function getTomadorById (tomadorId: string) {
    return prisma.tomador.findUnique({
        where: {
            id: tomadorId
        }
    })
}

export const tomadorRepository = {
    createTomador,
    updateDadosDoEndereco,
    updateDadosDaEmpresa,
    updateDadosDoContato,
    findByCnpj,
    getTomadorByUserId,
    getTomadorById
}