import { Request } from 'express';
import { IUser } from '../schemas/user';

export interface RequestExtended extends Request{
    user?: IUser;
}