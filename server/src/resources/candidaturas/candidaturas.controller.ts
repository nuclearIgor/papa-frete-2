import { Request, Response, NextFunction } from 'express';
import {candidaturasService} from "./candidaturas.service";

async function createCandidatura(req: Request, res: Response, next: NextFunction) {
    const { freteId } = res.locals
    const { userId } = res.locals

    try {
        const candidatura = await candidaturasService.createCandidatura(freteId.freteId, userId)
        return res.status(201).json({candidatura})
    } catch (e) {
        next(e)
    }
}

async function getCandidaturasByFreteId (req: Request, res: Response, next: NextFunction) {
    const { freteId } = req.params
    const { userId } = res.locals

    try {
        const candidaturas = await candidaturasService.getCandidaturasByFreteId(freteId, userId)
        return res.json({candidaturas})
    } catch (e) {
        next(e)
    }
}

async function getCandidaturasByPrestadorId (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals

    try {
        const candidaturas = await candidaturasService.getCandidaturasByPrestadorId(userId)
        return res.json({candidaturas})
    } catch (e) {
        next(e)
    }
}

export const candidaturasController = {
    createCandidatura,
    getCandidaturasByFreteId,
    getCandidaturasByPrestadorId
}