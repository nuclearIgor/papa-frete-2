import { NextFunction, Request, Response } from 'express';
import {userService} from "./users.service";

async function createUser(req: Request, res: Response, next: NextFunction) {
    const { registerData} = res.locals

    try {
        const userData = await userService.createUser(registerData)
        return res.status(201).json({user: userData })
    } catch (e) {
        next(e)
    }
}

export const userController = {
    createUser
}