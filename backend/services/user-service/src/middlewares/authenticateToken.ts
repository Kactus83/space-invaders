import { Request, Response, NextFunction } from 'express';
import JWTUtil from '../utils/JWTUtil';

/**
 * Middleware for authenticating JWT tokens.
 * This middleware checks if the JWT token provided in the 'Authorization' header of the request is valid.
 * If the token is valid, it extracts the user ID from the token and attaches it to the request object.
 * If the token is not valid or not present, it sends an appropriate response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        JWTUtil.verifyToken(token);
        next();
    } catch (error) {
        res.status(403).send({ error: (error as Error).message });
    }
};

