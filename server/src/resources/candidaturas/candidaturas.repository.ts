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

export const candidaturasRepository = {
    createCandidatura,
    getCandidaturaByFreteAndTomadorId,
    getCandidaturasByFreteId,
    getCandidaturasByPrestadorId
}