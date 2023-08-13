import {Request, Response, NextFunction} from "express";
import {loginDTO, LoginSchema} from "./auth.protocols";
import { verify } from 'jsonwebtoken'

export function validateLoginMiddleware (req: Request, res: Response, next: NextFunction) {
    const data: loginDTO = req.body

    let {error} = LoginSchema.validate(data, {abortEarly: false})

    if (error){
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }

    res.locals.loginData = data
    next()
}

export async function validateToken (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({msg: 'bad token'})
    }

    let decoded

    try {
        // @ts-ignore
        decoded = await verify(token, process.env.JWT_SECRET)
    } catch (e: any) {
        if(e.name === "TokenExpiredError"){
            return res.status(401).json({msg: 'token expirada'})
        }
        return res.status(401).json({msg: 'bad token'})
    }

    res.locals.userId = decoded.sub
    next()
}

