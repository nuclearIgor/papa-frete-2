import { prisma } from "../../../database";
import {createCandidaturaDTO} from "./candidaturas.protocols";

async function createCandidatura({freteId, prestadorId}: createCandidaturaDTO) {
    return prisma.candidatura.create({
        data: {
            Frete: {
                connect: {
                    id: freteId
                }
            },
            Prestador: {
                connect: {
                    id: prestadorId
                }
            }
        }
    })
}

async function getCandidaturaByFreteAndTomadorId(freteId: string, prestadorId: string) {
    return prisma.candidatura.findFirst({
        where: {
            freteId,
            prestadorId
        }
    })
}

async function getCandidaturasByFreteId(freteId: string) {
    return prisma.candidatura.findMany({
        where: {
            freteId
        },
        include: {
            Frete: true,
            Prestador: true
        }
    })
}

async function getCandidaturasByPrestadorId (prestadorId: string) {
    return prisma.candidatura.findMany({
        where: {
            prestadorId
        }
    })
}

async function updateCandidaturaAceita (candidaturaId: string) {
    return prisma.candidatura.update({
        where: {
            id: candidaturaId
        },
        data: {
            aceita: true,
            aceitaEm: new Date()
        }
    })
}

async function getCandidaturaById (candidaturaId: string) {
    return prisma.candidatura.findUnique({
        where: {
            id: candidaturaId
        },
        include: {
            Frete: {
                include: {
                    Tomador: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    })
}

export const candidaturasRepository = {
    createCandidatura,
    getCandidaturaByFreteAndTomadorId,
    getCandidaturasByFreteId,
    getCandidaturasByPrestadorId,
    updateCandidaturaAceita,
    getCandidaturaById
}