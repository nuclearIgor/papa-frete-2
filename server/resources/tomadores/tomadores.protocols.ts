import Joi from "joi";

export interface UpdateDadosDaEmpresaDTO {
    cnpj: string;
    nomeFantasia: string;
    ramo: string;
}

export const UpdateDadosDaEmpresaSchema = Joi.object({
    cnpj: Joi.string().length(14).required(),
    nomeFantasia: Joi.string().min(4).required(),
    ramo: Joi.any().valid('transportadora', 'embarcadora', 'agenciadora').required(),
})

export interface UpdateDadosDoContatoDTO {
    celular: string;
    nomeDoContato: string;
}

export interface UpdateDadosDoEnderecoDTO {
    uf: string;
    localidade: string;
    bairro: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
}

export const UpdateDadosDoContatoSchema = Joi.object({
    celular: Joi.string().length(15).required(),
    nomeDoContato: Joi.string().required(),
})

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