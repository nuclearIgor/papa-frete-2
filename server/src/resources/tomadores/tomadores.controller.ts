import {NextFunction, Request, Response} from "express";
import {tomadoresService} from "./tomadores.service";
import {prestadoresService} from "../prestadores/prestadores.service";

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
    const { userId } = res.locals
    const { dadosDaEmpresa } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateDadosDaEmpresa(dadosDaEmpresa, tomadorId, userId)
        return res.json({tomador})
    } catch (e) {
        next(e)
    }
}

async function updateDadosDoContato (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals
    const { dadosDoContato } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateDadosDoContato(dadosDoContato, tomadorId, userId)
        return res.json({tomador})
    } catch (e) {
        next(e)
    }
}

async function updateDadosDoEndereco (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals
    const { dadosDoEndereco } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateDadosDoEndereco(dadosDoEndereco, tomadorId, userId)
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



async function updateFotoDePerfilData (req: Request, res: Response) {
    const { fotoData } = res.locals
    const { tomadorId } = req.params

    try {
        const tomador = await tomadoresService.updateFotoDePerfilData(fotoData.fotoData, tomadorId)
        return res.json({ tomador })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        })
    }
}

export const tomadoresController = {
    createTomador,
    updateDadosDoEndereco,
    updateDadosDaEmpresa,
    updateDadosDoContato,
    getTomadorByuserId,
    updateFotoDePerfilData
}