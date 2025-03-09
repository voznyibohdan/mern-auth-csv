import express from 'express';
import 'dotenv/config';

import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';

import { config } from './config';

import { authRouter } from './routes/auth';
import { csvRouter } from './routes/csv';

class App {
    public readonly app: express.Application = express();

    constructor() {
        this.app.use(helmet());
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({ extended: true }));

        this.setupDB();
        this.setupRoutes();
    }

    private setupDB() {
        mongoose.connect(config.db.url)
            .then(() => console.log('Successfully connected to DB'))
            .catch(err => console.error('DB connection error:', err));
    }

    private setupRoutes() {
        this.app.use('/auth', authRouter);
        this.app.use('/csv', csvRouter);
    }
}

export const app = new App().app;
