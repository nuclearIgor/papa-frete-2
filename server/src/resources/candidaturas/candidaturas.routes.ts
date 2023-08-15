import {Router} from "express";
import {validateDataSchemaAndStoreInResLocals} from "../common/middleware/validateSchema.middleware";
import {createCandidaturaSchema} from "./candidaturas.protocols";
import {validateToken} from "../auth/auth.middleware";
import {candidaturasController} from "./candidaturas.controller";

const candidaturasRouter = Router()

candidaturasRouter.post('/', validateDataSchemaAndStoreInResLocals(createCandidaturaSchema, 'freteId'), validateToken, candidaturasController.createCandidatura)
candidaturasRouter.get('/:freteId', validateToken, candidaturasController.getCandidaturasByFreteId)
candidaturasRouter.get('/prestador/me', validateToken, candidaturasController.getCandidaturasByPrestadorId)
candidaturasRouter.patch('/candidatura/:candidaturaId/aceita', validateToken, candidaturasController.updateCandidaturaAceita)

export default candidaturasRouter
