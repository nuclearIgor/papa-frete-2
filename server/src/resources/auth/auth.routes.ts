import { Router } from "express";
import { validateLoginMiddleware, validateToken } from './auth.middleware';
import {authController} from "./auth.controller";
import {validateDataSchemaAndStoreInResLocals} from "../common/middleware/validateSchema.middleware";
import {mudarSenhaSchema} from "./auth.protocols";

const authRouter = Router()

authRouter.post('/login', validateLoginMiddleware, authController.login)
authRouter.get('/validate-token', validateToken, authController.validateToken)
authRouter.post('/change-password', validateDataSchemaAndStoreInResLocals(mudarSenhaSchema, 'mudarSenhaData'), validateToken, authController.changePassword)
export default authRouter