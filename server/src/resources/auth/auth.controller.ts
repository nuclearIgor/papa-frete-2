import {NextFunction, Response, Request} from "express";
import {authService} from "./auth.service";

async function login(req: Request, res: Response, next: NextFunction) {
    const { loginData } = res.locals

    try {
        const userData = await authService.login(loginData)
        res.json(userData)
    } catch (e) {
        console.log(e);
        next(e)
    }
}

async function validateToken (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals

    try {
        res.json({userId})
    } catch (e) {
        next(e)
    }
}

async function changePassword (req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals
    const { mudarSenhaData } = res.locals

    try {
        await authService.changePassword(userId, mudarSenhaData)
        return res.sendStatus(204)
    } catch (e) {
        next(e)
    }
}

async function requestResetPasswordToken(req: Request, res: Response, next: NextFunction) {
    const host = req.get('host')
    const {email} = req.body

    try {
        const link = await authService.passwordResetRequestToken(email, host)
        res.json({link})
    } catch (e) {
        next(e)
    }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
    const { token, userId, password } = req.body

    try {
        await authService.resetPassword(token, userId, password)
        res.json({msg: 'ok'})
    } catch (e) {
        next(e)
    }
}

export const authController = {
    login,
    validateToken,
    changePassword,
    requestResetPasswordToken,
    resetPassword
}