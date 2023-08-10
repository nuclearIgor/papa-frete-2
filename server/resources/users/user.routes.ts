import { Router} from "express";
import {userController} from "./users.controller";
import { validateDataSchemaAndStoreInResLocals } from '../common/middleware/validateSchema.middleware';
import { RegisterSchema } from './user.protocols';

const userRouter = Router()

userRouter.post('/register', validateDataSchemaAndStoreInResLocals(RegisterSchema, 'registerData'), userController.createUser)

export default userRouter