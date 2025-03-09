import jwt from 'jsonwebtoken';
import { config } from '../../config';

export interface JwtPayload {
    userId: string;
}

class JWTService {
    generateTokens(userId: string) {
        const accessToken = jwt.sign({ userId }, config.jwt.accessToken.secret, {
            expiresIn: config.jwt.accessToken.expiresIn as jwt.SignOptions['expiresIn']
        });

        const refreshToken = jwt.sign({ userId}, config.jwt.refreshToken.secret, {
            expiresIn: config.jwt.refreshToken.expiresIn as jwt.SignOptions['expiresIn'],
        });

        return { accessToken, refreshToken };
    }

    verifyToken(token: string, type: 'accessToken' | 'refreshToken'): JwtPayload | null {
        try {
            return jwt.verify(token, config.jwt[type].secret) as JwtPayload;
        } catch (error) {
            return null;
        }
    }
}

export const JwtService = new JWTService();