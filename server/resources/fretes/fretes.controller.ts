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
    console.log(req.query)

    try {
        const fretes = await fretesService.fetchAllFretes()
        res.status(200).json({fretes})
    } catch (e) {
        next(e)
    }
}

export const fretesController = {
    createFrete,
    fetchAllFretes,
    fetchFretesByTomadorId
}