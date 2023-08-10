import Joi from "joi";

export interface createCandidaturaDTO {
    freteId: string;
    prestadorId: string;
}

export const createCandidaturaSchema = Joi.object({
    freteId: Joi.string().required(),
})
