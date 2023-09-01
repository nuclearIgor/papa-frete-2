import Joi from "joi";

export interface CheckEmailECpfDTO {
    email: string;
    cpf: string;
}

export const CheckEmailECpfSchema = Joi.object({
    email: Joi.string().email().required(),
    cpf: Joi.string().length(11).required()
})
export interface UpdateDadosPessoaisDTO {
    nomeCompleto: string;
    cpf: string;
    ddd: string;
    celular: string;
    cnh: string;
    categoriaCNH: string;
}

export const UpdateDadosPessoaisSchema = Joi.object({
    nomeCompleto: Joi.string().min(6).required(),
    ddd: Joi.string().length(2).required(),
    celular: Joi.string().length(10).required(),
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

export interface UpdateDadosDoEnderecoDTO {
    uf: string;
    localidade: string;
    bairro: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
}

export const UpdateDadosDoEnderecoSchema = Joi.object({
    uf: Joi.string().length(2).required(),
    localidade: Joi.string().required(),
    bairro: Joi.string().required(),
    cep: Joi.string().required(),
    logradouro: Joi.string().required(),
    numero: Joi.string().required(),
    complemento: Joi.any().optional(),
    // complemento: Joi.string().presence('optional'),
})

export interface CreatePrestadorDTO {
    email: string;
    senha: string;
    tipoDeConta: string;

    nome: string;
    ddd: string;
    telefone: string;

    cpf: string;
    cnh: string;
    categoriaCNH: string;

    uf: string;
    localidade: string;
    bairro: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;

    tipoVeiculo: string;
    tipoCarroceria: string;
    anoDeFabricacao: string
}

export const CreatePrestadorSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    tipoDeConta: Joi.any().valid("prestador", "tomador").required(),

    nome: Joi.string().min(6).required(),
    ddd: Joi.string().length(2).required(),
    telefone: Joi.string().length(10).required(),

    cpf: Joi.string().length(11).required(),

    cnh: Joi.string().length(11).required(),
    categoriaCNH: Joi.any().valid(
        'A', 'B', 'C', 'D', 'E', 'F'
    ).required(),

    uf: Joi.string().length(2).required(),
    localidade: Joi.string().required(),
    bairro: Joi.string().required(),
    cep: Joi.string().required(),
    logradouro: Joi.string().required(),
    numero: Joi.string().required(),
    complemento: Joi.any().optional(),

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

export const UpdateFotoDePerfilSchema = Joi.object({
    fotoData: Joi.string().required(),
})