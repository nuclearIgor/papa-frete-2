import { Router } from "express";
import {prestadoresController} from "./prestadores.controller";
import { validateDataSchemaAndStoreInResLocals } from '../common/middleware/validateSchema.middleware';
import {
    UpdateDadosDoEnderecoSchema,
    UpdateDadosDoVeiculoSchema,
    UpdateDadosPessoaisSchema
} from './prestadores.protocols';
import { RegisterSchema } from '../users/user.protocols';
import { validateToken } from '../auth/auth.middleware';

const prestadoresRouter = Router()

prestadoresRouter.post('/create', validateDataSchemaAndStoreInResLocals(RegisterSchema, 'registerData'), prestadoresController.createPrestador)
prestadoresRouter.patch('/:prestadorId/dados-pessoais', validateDataSchemaAndStoreInResLocals(UpdateDadosPessoaisSchema, 'dadosPessoaisData'), prestadoresController.updateDadosPessoais)
prestadoresRouter.patch('/:prestadorId/dados-veiculo', validateDataSchemaAndStoreInResLocals(UpdateDadosDoVeiculoSchema, 'dadosDoVeiculoData'), prestadoresController.updateDadosDoVeiculo)
prestadoresRouter.patch('/:prestadorId/dados-endereco', validateDataSchemaAndStoreInResLocals(UpdateDadosDoEnderecoSchema, 'dadosDoEnderecoData'), prestadoresController.updateDadosDoEndereco)
prestadoresRouter.get('/me', validateToken, prestadoresController.getPrestadorByUserId)

export default prestadoresRouter