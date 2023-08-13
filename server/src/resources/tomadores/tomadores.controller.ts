import {NextFunction, Request, Response} from "express";
import {tomadoresService} from "./tomadores.service";

async function createTomador (req: Request, res: Response, next: NextFunction) {
    const { registerData } = res.locals

    try {
        const tomador = await tomadoresService.createTomador(registerData)
        return res.status(201).json({tomador})
    } catch (e) {
        next(e)
    }
}

async function updateDadosDaEmpresa (req: Request, res: Response, next: NextFunction) {
    const { dadosDaEmpresa } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateDadosDaEmpresa(dadosDaEmpresa, tomadorId)
        return res.json({tomador})
    } catch (e) {
        next(e)
    }
}

async function updateDadosDoContato (req: Request, res: Response, next: NextFunction) {
    const { dadosDoContato } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateDadosDoContato(dadosDoContato, tomadorId)
        return res.json({tomador})
    } catch (e) {
        next(e)
    }
}

async function updateDadosDoEndereco (req: Request, res: Response, next: NextFunction) {
    const { dadosDoEndereco } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateDadosDoEndereco(dadosDoEndereco, tomadorId)
        return res.json({tomador})
    } catch (e) {
        next(e)
    }
}
async function getTomadorByuserId (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals
    console.log(userId)
    try {
        const tomador = await tomadoresService.getTomadorByuserId(userId)
        return res.json({tomador})
    } catch (e) {
        next(e)
    }
}

export const tomadoresController = {
    createTomador,
    updateDadosDoEndereco,
    updateDadosDaEmpresa,
    updateDadosDoContato,
    getTomadorByuserId
}