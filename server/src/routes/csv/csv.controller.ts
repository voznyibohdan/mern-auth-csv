import { Request, Response } from 'express';

import multer from 'multer';
import csvParser from 'csv-parser';

import fs from 'node:fs';
import path from 'node:path';

import { Customer } from '../../schemas/customer';

class CsvController {
    uploadCustomers = async (req: Request, res: Response) => {
        await Customer.deleteMany({});

        this.upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: 'Please upload a CSV file' });
            }

            this.processCsv(req.file.path)
                .then(() => res.status(200).json({ success: true, message: 'Customers uploaded successfully.' }))
                .catch((error) => res.status(500).json({ success: false, message: 'Internal server error', error }));
        });
    };

    getCustomers = async (_req: Request, res: Response) => {
        try {
            const customers = await Customer.find({});
            res.status(200).json({ customers });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    private upload = multer({
        storage: multer.diskStorage({
            destination: (_req, _file, cb) => {
                cb(null, path.join(process.cwd(), 'uploads'));
            },
            filename: (_req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        }),
        fileFilter: (_req, file, cb) => {
            if (file.mimetype === 'text/csv') {
                cb(null, true);
            }  else {
                cb(new Error('Only CSV files are allowed'));
            }
        }
    }).single('file');

    private processCsv = async (filePath: string):Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', async (row) => {
                    try {
                        const customer = {
                            username: row.username,
                            email: row.email,
                            balance: parseFloat(row.balance),
                            referralsCount: parseInt(row.referralsCount),
                            createdAt: row.createdAt
                        };
                        await Customer.create(customer);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => {
                    reject(error);
                })
                .on('end', () => {
                    fs.unlinkSync(filePath);
                    resolve();
                });
        });
    };
}

export const csvController = new CsvController();
