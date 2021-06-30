import { User } from '../entity/user.schema';
import { ID } from '../../../common/types';
import { ISearchUserParams } from './ISearchUserParams';

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: ISearchUserParams): Promise<User[]>;
}
