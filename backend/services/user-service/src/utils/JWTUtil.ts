import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; 

export default class JWTUtil {
    /**
     * Generates a JWT token for the user.
     * 
     * @param userId The ID of the user.
     * @returns The generated JWT token.
     */
    public static generateToken(userId: number): string {
        return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
    }
    
    /**
     * Verify a JWT token and extract the payload.
     * 
     * @param token The JWT token to verify.
     * @returns The payload of the token.
     */
    public static verifyToken(token: string): jwt.JwtPayload {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded as jwt.JwtPayload;
        } catch (error) {
            throw new Error('Invalid token.');
        }
    }
}
