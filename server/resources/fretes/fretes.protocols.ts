import Joi from "joi";

export interface CreateFreteDTO {
    ufOrigem: string
    cidadeOrigem: string

    ufDestino: string
    cidadeDestino: string

    coleta: string
    entrega: string
    oferece: string

    tipoDeCarga: string
    observacoes: string

    veiculoAlvo: string | null
    carroceriaAlvo: string | null
}

export const CreateFreteSchema = Joi.object({
    ufOrigem: Joi.string().length(2).required(),
    cidadeOrigem: Joi.string().required(),
    ufDestino: Joi.string().length(2).required(),
    cidadeDestino: Joi.string().required(),

    coleta: Joi.string().required(),
    entrega: Joi.string().required(),
    oferece: Joi.string().required(),

    tipoDeCarga: Joi.any().valid('seca', 'graos', 'refrigerada').required(),
    observacoes: Joi.any().optional(),

    veiculoAlvo: Joi.any().optional(),
    carroceriaAlvo: Joi.any().optional(),
})