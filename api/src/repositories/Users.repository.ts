import { User } from 'entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepositories extends Repository<User> { }
