import Joi from "joi";

export interface loginDTO {
    email: string;
    senha: string;
}

export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
})

export interface mudarSenhaDTO {
    senhaAtual: string;
    novaSenha: string
}

export const mudarSenhaSchema = Joi.object({
    senhaAtual: Joi.string().required(),
    novaSenha: Joi.string().min(6).required(),
})