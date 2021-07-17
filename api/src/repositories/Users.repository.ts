import { User } from 'entities/user';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepositories extends Repository<User> { } 
