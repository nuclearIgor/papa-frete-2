import { prisma } from "../../../database";
import {CreateFreteDTO, UpdateFreteDTO} from "./fretes.protocols";

async function createFrete ({
                                ufOrigem,
                                cidadeOrigem,
                                ufDestino,
                                cidadeDestino,
                                tipoDeCarga,
                                observacoes,
                                veiculoAlvo,
                                carroceriaAlvo,
                                entrega,
                                janelaEntrega,
                                coleta,
                                janelaColeta,
                                oferecePedagio,
                                oferecePernoite,
                                ofereceCarga,
                                ofereceDescarga,
                                reaisPorKm

}: CreateFreteDTO, tomadorId: string) {
    return prisma.frete.create({
        data: {
            Tomador: {
                connect: {
                    id: tomadorId
                }
            },
            ufOrigem,
            cidadeOrigem,
            ufDestino,
            cidadeDestino,
            tipoDeCarga,
            observacoes,
            veiculoAlvo,
            carroceriaAlvo,
            entrega,
            janelaEntrega,
            coleta,
            janelaColeta,
            oferecePedagio,
            oferecePernoite,
            ofereceCarga,
            ofereceDescarga,
            reaisPorKm,
            visivel: true
        }
    })
}

async function fetchAllFretes () {
    return prisma.frete.findMany({
        include: {
            Tomador: {
                select: {
                    nomeFantasia: true
                }
            }
        }
    })
}

async function fetchFretesByTomadorId (tomadorId: string) {
    return prisma.frete.findMany({
        where: {
            tomadorId
        },
        include: {
            Candidatura: true
        }
    })
}

async function fetchFreteById (freteId: string) {
    return prisma.frete.findUnique({
        where: {
            id: freteId
        },
        include: {
            Candidatura: true,
            Tomador: {
                select: {
                    nomeFantasia: true,
                }
            }
        }
    })
}

async function updateFrete ({
    id,
    ufOrigem,
    cidadeOrigem,
    ufDestino,
    cidadeDestino,
    coleta,
    janelaColeta,
    entrega,
    janelaEntrega,
    veiculoAlvo,
    carroceriaAlvo,
    tipoDeCarga,
    ofereceDescarga,
    ofereceCarga,
    oferecePernoite,
    oferecePedagio,
    reaisPorKm,
    observacoes
                            }: UpdateFreteDTO) {
    return prisma.frete.update({
        where: {
            id
        },
        data: {
            ufOrigem,
            cidadeOrigem,
            ufDestino,
            cidadeDestino,
            coleta,
            janelaColeta,
            entrega,
            janelaEntrega,
            veiculoAlvo,
            carroceriaAlvo,
            tipoDeCarga,
            ofereceDescarga,
            ofereceCarga,
            oferecePernoite,
            oferecePedagio,
            reaisPorKm,
            observacoes
        }
    })
}

async function deleteFrete(freteId: string) {
    return prisma.frete.delete({
        where: {
            id: freteId
        }
    })
}

export const fretesRepository = {
    createFrete,
    fetchAllFretes,
    fetchFretesByTomadorId,
    fetchFreteById,
    updateFrete,
    deleteFrete
}