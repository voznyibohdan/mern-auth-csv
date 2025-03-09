import mongoose from 'mongoose';

export interface ICustomer extends mongoose.Document {
    username: string;
    email: string;
    balance: number;
    referralsCount: number;
    createdAt: Date;
}

const CustomerSchema = new mongoose.Schema<ICustomer>({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    balance: { type: Number, required: true },
    referralsCount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
