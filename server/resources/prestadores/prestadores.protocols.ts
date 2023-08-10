import Joi from "joi";

export interface UpdateDadosPessoaisDTO {
    nomeCompleto: string;
    cpf: string;
    celular: string;
    cnh: string;
    categoriaCNH: string;
}

export const UpdateDadosPessoaisSchema = Joi.object({
    nomeCompleto: Joi.string().min(6).required(),
    cpf: Joi.string().length(11).required(),
    celular: Joi.string().length(15).required(),
    cnh: Joi.string().length(11).required(),
    categoriaCNH: Joi.any().valid(
        'A', 'B', 'C', 'D', 'E', 'F'
    ).required(),
})

export interface UpdateDadosDoVeiculoDTO {
    tipoVeiculo: string;
    tipoCarroceria: string;
    anoDeFabricacao: string
}
export const UpdateDadosDoVeiculoSchema = Joi.object({
    tipoVeiculo: Joi.any().valid(
        'bitrem', 'carreta', 'carreta ls', 'rodotrem', 'vanderleia', 'bitruck', 'truck', '3/4', 'fiorino', 'toco', 'vlc'
    ).required(),
    tipoCarroceria: Joi.any().valid(
        'cacamba', 'grade baixa', 'graneleiro', 'prancha', 'bau',
        'bau frigorifico', 'sider', 'bug porta container',
        'cegonheiro', 'gaiola', 'silo', 'tanque', 'apenas cavalo', 'cavaqueira', 'munck'
    ).required(),
    anoDeFabricacao: Joi.string().length(4).required(),
})