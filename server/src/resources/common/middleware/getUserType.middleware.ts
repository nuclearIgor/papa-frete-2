import {AnySchema} from "joi";
import {NextFunction, Request, Response} from "express";
import {userRepository} from "../../users/users.repository";
import {ApplicationError} from "../applicationError";

export const getUserTypeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = res.locals

        const user = await userRepository.getUserById(userId)

        if (!user) {
            throw new ApplicationError('user nao existe', 400)
        }

        res.locals.tipoDeConta = user.tipoDeConta
        next()

    } catch (e) {
        next(e)
    }
}