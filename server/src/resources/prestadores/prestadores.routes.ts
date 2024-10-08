import { Router } from "express";
import {prestadoresController} from "./prestadores.controller";
import { validateDataSchemaAndStoreInResLocals } from '../common/middleware/validateSchema.middleware';
import {
    UpdateDadosDoEnderecoSchema,
    UpdateDadosDoVeiculoSchema,
    UpdateDadosPessoaisSchema, UpdateFotoDePerfilSchema
} from './prestadores.protocols';
import { RegisterSchema } from '../users/user.protocols';
import { validateToken } from '../auth/auth.middleware';

const prestadoresRouter = Router()

prestadoresRouter.post('/create', validateDataSchemaAndStoreInResLocals(RegisterSchema, 'registerData'), prestadoresController.createPrestador)
prestadoresRouter.patch('/:prestadorId/dados-pessoais', validateToken, validateDataSchemaAndStoreInResLocals(UpdateDadosPessoaisSchema, 'dadosPessoaisData'), prestadoresController.updateDadosPessoais)
prestadoresRouter.patch('/:prestadorId/dados-veiculo', validateToken, validateDataSchemaAndStoreInResLocals(UpdateDadosDoVeiculoSchema, 'dadosDoVeiculoData'), prestadoresController.updateDadosDoVeiculo)
prestadoresRouter.patch('/:prestadorId/dados-endereco', validateToken, validateDataSchemaAndStoreInResLocals(UpdateDadosDoEnderecoSchema, 'dadosDoEnderecoData'), prestadoresController.updateDadosDoEndereco)
prestadoresRouter.patch('/:prestadorId/foto-perfil', validateToken, validateDataSchemaAndStoreInResLocals(UpdateFotoDePerfilSchema, 'fotoData'), prestadoresController.updateFotoDePerfilData)
prestadoresRouter.get('/me', validateToken, prestadoresController.getPrestadorByUserId)

export default prestadoresRouter