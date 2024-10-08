import { Router } from "express";
import { validateToken } from '../auth/auth.middleware';
import { fretesController } from './fretes.controller';
import { validateDataSchemaAndStoreInResLocals } from '../common/middleware/validateSchema.middleware';
import {CreateFreteSchema, UpdateFreteSchema} from './fretes.protocols';
import {getUserTypeMiddleware} from "../common/middleware/getUserType.middleware";

const fretesRouter = Router()

fretesRouter.post('/', validateDataSchemaAndStoreInResLocals(CreateFreteSchema, 'freteData'), validateToken,  fretesController.createFrete)
fretesRouter.get('/', validateToken,  fretesController.fetchAllFretes)
fretesRouter.get('/me', validateToken,  fretesController.fetchFretesByTomadorId)
fretesRouter.get('/frete/:freteId', validateToken, getUserTypeMiddleware,  fretesController.fetchFreteById)
fretesRouter.patch('/update/:freteId', validateDataSchemaAndStoreInResLocals(UpdateFreteSchema, 'freteData'), validateToken,  fretesController.updateFrete)
fretesRouter.delete('/delete/:freteId', validateToken,  fretesController.deleteFrete)


export default fretesRouter
