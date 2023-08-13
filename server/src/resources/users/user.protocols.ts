import Joi from "joi";

export interface RegisterDTO {
    email: string;
    senha: string;
    tipoDeConta: string;
}

export interface CreateUserDTO {
    email: string;
    passwordHash: string;
    tipoDeConta: string;
}

export const RegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    tipoDeConta: Joi.any().valid("prestador", "tomador").required(),
})
