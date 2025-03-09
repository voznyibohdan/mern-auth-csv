import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/refresh', authController.refresh);

export const authRouter = router;
