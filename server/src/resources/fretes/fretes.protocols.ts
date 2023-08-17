import Joi from "joi";

export interface CreateFreteDTO {
    ufOrigem: string
    cidadeOrigem: string

    ufDestino: string
    cidadeDestino: string

    coleta: string
    janelaColeta: string

    entrega: string
    janelaEntrega: string

    oferecePedagio: boolean
    oferecePernoite: boolean
    ofereceCarga: boolean
    ofereceDescarga: boolean

    reaisPorKm: string

    tipoDeCarga: string
    observacoes: string

    veiculoAlvo: string
    carroceriaAlvo: string
}

export interface UpdateFreteDTO {
    id: string
    tomadorId: string

    visivel: boolean

    ufOrigem: string
    cidadeOrigem: string

    ufDestino: string
    cidadeDestino: string

    coleta: string
    janelaColeta: string

    entrega: string
    janelaEntrega: string

    oferecePedagio: boolean
    oferecePernoite: boolean
    ofereceCarga: boolean
    ofereceDescarga: boolean

    reaisPorKm: string

    tipoDeCarga: string
    observacoes: string

    veiculoAlvo: string
    carroceriaAlvo: string
}

export const CreateFreteSchema = Joi.object({
    ufOrigem: Joi.string().length(2).required(),
    cidadeOrigem: Joi.string().required(),
    ufDestino: Joi.string().length(2).required(),
    cidadeDestino: Joi.string().required(),

    coleta: Joi.string().required(),
    janelaColeta: Joi.string().required(),

    entrega: Joi.string().required(),
    janelaEntrega: Joi.string().required(),

    oferecePedagio: Joi.boolean().required(),
    oferecePernoite: Joi.boolean().required(),
    ofereceCarga: Joi.boolean().required(),
    ofereceDescarga: Joi.boolean().required(),

    reaisPorKm: Joi.string().required(),

    tipoDeCarga: Joi.any().valid('seca', 'graos', 'refrigerada').required(),
    observacoes: Joi.any().optional(),

    veiculoAlvo: Joi.any().optional(),
    carroceriaAlvo: Joi.any().optional(),
})

export const UpdateFreteSchema = Joi.object({
    id: Joi.string().required(),
    tomadorId: Joi.string().required(),

    visivel: Joi.boolean().required(),

    ufOrigem: Joi.string().length(2).required(),
    cidadeOrigem: Joi.string().required(),
    ufDestino: Joi.string().length(2).required(),
    cidadeDestino: Joi.string().required(),

    coleta: Joi.string().required(),
    janelaColeta: Joi.string().required(),

    entrega: Joi.string().required(),
    janelaEntrega: Joi.string().required(),

    oferecePedagio: Joi.boolean().required(),
    oferecePernoite: Joi.boolean().required(),
    ofereceCarga: Joi.boolean().required(),
    ofereceDescarga: Joi.boolean().required(),

    reaisPorKm: Joi.string().required(),

    tipoDeCarga: Joi.any().valid('seca', 'graos', 'refrigerada').required(),
    observacoes: Joi.any().optional(),

    veiculoAlvo: Joi.any().optional(),
    carroceriaAlvo: Joi.any().optional(),
})