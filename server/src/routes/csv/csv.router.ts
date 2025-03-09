import express from 'express';

import { authMiddleware } from '../../middlewares/auth';
import { csvController } from './csv.controller';

const router = express.Router();

router.post('/uploadCustomers', authMiddleware, csvController.uploadCustomers);
router.get('/getCustomers', authMiddleware, csvController.getCustomers);

export const csvRouter = router;
