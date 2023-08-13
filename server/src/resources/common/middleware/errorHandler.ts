import {ApplicationError} from "../applicationError";
import { Request, Response, NextFunction} from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApplicationError) {

        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
}

