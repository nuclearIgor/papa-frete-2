import {NextFunction, Request, Response} from "express";
import {prestadoresService} from "./prestadores.service";

async function createPrestador (req: Request, res: Response, next: NextFunction) {
    const { registerData } = res.locals

    try {
        const prestador = await prestadoresService.createPrestador(registerData)
        return res.json({ prestador })
    } catch (e) {
        next(e)
    }
}

async function updateDadosPessoais(req: Request, res: Response, next: NextFunction) {
    const { dadosPessoaisData } = res.locals
    const { prestadorId } = req.params

    try {
        const prestador = await prestadoresService.updateDadosPessoais(dadosPessoaisData, prestadorId)
        return res.json({ prestador })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

async function updateDadosDoEndereco (req: Request, res: Response, next: NextFunction) {
    const { dadosDoEnderecoData } = res.locals
    const { prestadorId } = req.params

    try {
        const prestador = await prestadoresService.updateDadosDoEndereco(dadosDoEnderecoData, prestadorId)
        return res.json({ prestador })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

async function updateDadosDoVeiculo (req: Request, res: Response) {
    const { dadosDoVeiculoData } = res.locals
    const { prestadorId } = req.params

    try {
        const prestador = await prestadoresService.updateDadosDoVeiculo(dadosDoVeiculoData, prestadorId)
        return res.json({ prestador })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        })
    }
}

async function getPrestadorByUserId (req: Request, res: Response) {
    const { userId } = res.locals

    try {
        const prestador = await prestadoresService.getPrestadorByUserId(userId)
        return res.json({ prestador })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        })
    }
}

async function updateFotoDePerfilData (req: Request, res: Response) {
    const { fotoData } = res.locals
    const { prestadorId } = req.params
    const size = req.headers['content-length']
    console.log(size)

    try {
        const prestador = await prestadoresService.updateFotoDePerfilData(fotoData.fotoData, prestadorId)
        return res.json({ prestador })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        })
    }
}

export const prestadoresController = {
    createPrestador,
    updateDadosPessoais,
    updateDadosDoVeiculo,
    updateDadosDoEndereco,
    getPrestadorByUserId,
    updateFotoDePerfilData
}