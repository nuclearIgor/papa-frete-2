import { prisma } from "../../database";
import { CreateFreteDTO } from "./fretes.protocols";

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
    return prisma.frete.findMany({})
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
        }
    })
}

export const fretesRepository = {
    createFrete,
    fetchAllFretes,
    fetchFretesByTomadorId,
    fetchFreteById
}