import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // abortEarly: false pour renvoyer tous les messages d'erreur
    if (error) {
        console.error('Error during full sign-up:', error);
        return res.status(400).send({ error: 'Validation failed', details: error.details.map(d => d.message).join(', ') });
    }
    next();
};