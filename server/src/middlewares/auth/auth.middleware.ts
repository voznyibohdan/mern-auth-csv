import { Response,NextFunction } from 'express';
import { RequestExtended } from '../../types';

import { JwtService } from '../../services/jwt';
import { User } from '../../schemas/user';

export async function authMiddleware (req: RequestExtended, res: Response, next: NextFunction)  {
    try {
        const token = req.headers.authorization?.split(' ')[1] || '';

        const payload = JwtService.verifyToken(token, 'accessToken');
        if (!payload) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const user = await User.findOne({ _id: payload.userId });
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}
