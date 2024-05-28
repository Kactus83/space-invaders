import { Request, Response, NextFunction } from 'express';

export const normalizeData = (req: Request, res: Response, next: NextFunction) => {
    for (const key in req.body) {
        if (req.body[key] === '') {
            req.body[key] = null;
        }
    }
    next();
};