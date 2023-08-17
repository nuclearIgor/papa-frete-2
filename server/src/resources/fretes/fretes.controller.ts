import {Request, Response, NextFunction} from "express";
import { fretesService } from './fretes.service';

async function createFrete(req: Request, res: Response, next: NextFunction) {
    const { freteData } = res.locals
    const { userId } = res.locals
    //
    // console.log('fretedata: \n', freteData)
    try {
        const frete = await fretesService.createFrete(freteData, userId)
        res.status(201).json({frete})
    } catch (e) {
        next(e)
    }
}

async function fetchFretesByTomadorId(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals

    try {
        const fretes = await fretesService.fetchFretesByTomadorId(userId)
        res.status(200).json({fretes})
    } catch (e) {
        next(e)
    }
}

async function fetchAllFretes(req: Request, res: Response, next: NextFunction) {
    console.log('frete query:\n',req.query)
    const {
        ufOrigem,
        cidadeOrigem,
        cidadeDestino,
        ufDestino,
        startDate,
        coletaLivre
    } = req.query

    try {
        const fretes = await fretesService.fetchAllFretes(
            ufOrigem,
            cidadeOrigem,
            cidadeDestino,
            ufDestino,
            startDate,
            coletaLivre
        )
        res.status(200).json({fretes})
    } catch (e) {
        next(e)
    }
}

async function deleteFrete(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals
    const { freteId } = req.params

    try {
        await fretesService.deleteFrete(userId, freteId)
        res.status(204).send()
    } catch (e) {
        next(e)
    }
}

async function updateFrete (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals
    const { freteData } = res.locals

    try {
        const frete = await fretesService.updateFrete(userId, freteData)
        res.status(200).json({frete})
    } catch (e) {
        next(e)
    }
}

async function fetchFreteById (req: Request, res: Response, next: NextFunction) {
    const { freteId } = req.params
    const { userId } = res.locals
    const { tipoDeConta } = res.locals

    try {
        const frete = await fretesService.fetchFreteById(freteId, userId, tipoDeConta)
        res.status(200).json({frete})
    } catch (e) {
        next(e)
    }
}

export const fretesController = {
    createFrete,
    fetchAllFretes,
    fetchFretesByTomadorId,
    deleteFrete,
    updateFrete,
    fetchFreteById
}