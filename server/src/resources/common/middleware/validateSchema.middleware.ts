import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

export const validateDataSchemaAndStoreInResLocals = (schema: AnySchema, key: string) => (req: Request, res: Response, next: NextFunction) => {
    const data = req.body

    let {error} = schema.validate(data, {abortEarly: false})

    if (error){
        const errors = error.details.map((detail: any) => detail.message)
        return res.status(400).send(errors)
    }

    res.locals[`${key}`] = data
    next()
}