import { prisma } from "../../database";
import { CreateFreteDTO } from "./fretes.protocols";

async function createFrete ({ufOrigem, cidadeOrigem, ufDestino, cidadeDestino, tipoDeCarga, observacoes, veiculoAlvo, carroceriaAlvo, entrega, coleta, oferece}: CreateFreteDTO, tomadorId: string) {
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
            coleta,
            oferece
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

export const fretesRepository = {
    createFrete,
    fetchAllFretes,
    fetchFretesByTomadorId
}