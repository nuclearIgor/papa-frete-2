import { Router } from "express";
import { validateLoginMiddleware, validateToken } from './auth.middleware';
import {authController} from "./auth.controller";

const authRouter = Router()

authRouter.post('/login', validateLoginMiddleware, authController.login)
authRouter.get('/validate-token', validateToken, authController.validateToken)
export default authRouter