import {Router} from "express";
import {tomadoresController} from "./tomadores.controller";
import { validateDataSchemaAndStoreInResLocals } from '../common/middleware/validateSchema.middleware';
import { RegisterSchema } from '../users/user.protocols';
import {
    UpdateDadosDaEmpresaSchema,
    UpdateDadosDoContatoSchema,
    UpdateDadosDoEnderecoSchema, UpdateFotoDePerfilSchema
} from './tomadores.protocols';
import {validateToken} from "../auth/auth.middleware";

const tomadoresRouter = Router()

tomadoresRouter.post('/create', validateDataSchemaAndStoreInResLocals(RegisterSchema, 'registerData'), tomadoresController.createTomador)
tomadoresRouter.patch('/:tomadorId/dados-empresa', validateToken,  validateDataSchemaAndStoreInResLocals(UpdateDadosDaEmpresaSchema, 'dadosDaEmpresa'), tomadoresController.updateDadosDaEmpresa)
tomadoresRouter.patch('/:tomadorId/dados-contato', validateToken, validateDataSchemaAndStoreInResLocals(UpdateDadosDoContatoSchema, 'dadosDoContato'), tomadoresController.updateDadosDoContato)
tomadoresRouter.patch('/:tomadorId/dados-endereco', validateToken, validateDataSchemaAndStoreInResLocals(UpdateDadosDoEnderecoSchema, 'dadosDoEndereco'), tomadoresController.updateDadosDoEndereco)
tomadoresRouter.patch('/:tomadorId/foto-perfil', validateToken, validateDataSchemaAndStoreInResLocals(UpdateFotoDePerfilSchema, 'fotoData'), tomadoresController.updateFotoDePerfilData)
tomadoresRouter.get('/me', validateToken, tomadoresController.getTomadorByuserId)

export default tomadoresRouter
