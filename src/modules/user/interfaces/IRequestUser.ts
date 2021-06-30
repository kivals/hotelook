import { Request } from 'express';
import { User } from '../entity/user.schema';

export interface IRequestUser extends Request {
  user: User;
}
