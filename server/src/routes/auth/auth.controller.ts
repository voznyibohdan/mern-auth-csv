import { Request, Response } from 'express';

import { User } from '../../schemas/user';
import { JwtService } from '../../services/jwt';

class AuthController {
    private readonly rtCookiesOptions = {
        httpOnly: true,
        sameSite: 'strict' as const,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }

    signup = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            const newUser = new User({ email, password });
            await newUser.save();

            const { accessToken, refreshToken } = JwtService.generateTokens(newUser.id);

            newUser.refreshToken = refreshToken;
            await newUser.save();

            res.cookie('refreshToken', refreshToken, this.rtCookiesOptions);
            res.status(201).json({ id: newUser.id, email: newUser.email, accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    signin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const { accessToken, refreshToken } = JwtService.generateTokens(user.id);

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('refreshToken', refreshToken, this.rtCookiesOptions);
            res.status(201).json({ id: user.id, email: user.email, accessToken });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    refresh = async (req: Request, res: Response) =>{
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(400).json({ message: 'Refresh token is required' });
                return;
            }

            const payload = JwtService.verifyToken(refreshToken, 'refreshToken');
            if (!payload) {
                res.status(401).json({ message: 'Invalid or expired refresh token' });
                return;
            }

            const user = await User.findById(payload.userId);
            if (!user || user.refreshToken !== refreshToken) {
                res.status(401).json({ message: 'Invalid refresh token' });
                return;
            }

            const { accessToken, refreshToken: newRefreshToken } = JwtService.generateTokens(user.id);

            user.refreshToken = newRefreshToken;
            await user.save();

            res.cookie('refreshToken', refreshToken, this.rtCookiesOptions);
            res.status(200).json({ accessToken });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const authController = new AuthController();
