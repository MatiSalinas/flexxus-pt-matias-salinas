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

export const validateQuery = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        schema.parse(req.query);
        next();
    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: "Error validating request body",
            error: error.errors
        })
    }
}

export const validateParams = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        schema.parse(req.params);
        next();
    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: "Error validating request parameters",
            error: error.errors
        });
    }
};


export const validateResponse = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const originalSend = res.send;
    
    res.send = function(data: any) {
        try {
            // Si es un objeto con success: false, es un error y no lo validamos
            if (typeof data === 'object' && data.success === false) {
                return originalSend.call(this, data);
            }
            
            // Si es string, tampoco validamos
            if (typeof data === 'string') {
                return originalSend.call(this, data);
            }
            
            // Solo validamos respuestas exitosas
            const validatedData = schema.parse(data);
            return originalSend.call(this, validatedData);
        } catch (error: any) {
            console.error('Error validating response:', {
                endpoint: `${req.method} ${req.originalUrl}`,
                error: error.errors
            });
            
            return originalSend.call(this, {
                success: false,
                message: "Error validating response data",
                error: process.env.NODE_ENV === 'development' ? error.errors : 'Internal server error'
            });
        }
    };
    
    next();
};