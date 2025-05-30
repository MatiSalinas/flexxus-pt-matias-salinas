import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        schema.parse(req.body);
        next();
    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: "Error validating request body",
            error: error.errors
        })
    }
}