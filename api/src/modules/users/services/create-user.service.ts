import { pbkdf2Sync, randomBytes } from 'crypto';
import { validate } from 'email-validator';
import { StatusResponseEnum } from 'modules/enums/status-responses.enum';
import { UsersRepositories } from 'repositories/users.repository';
import { getCustomRepository } from 'typeorm';

import { UserRequest } from '../models/user-request.model';
import { Validation } from '../models/validation.model';

export class CreateUserService {

  async execute(user: UserRequest): Promise<any | StatusResponseEnum> {
    // console.log('CHEGOU AQUI =');
    const usersRepository = getCustomRepository(UsersRepositories); 

    const isUserValid = await this.isValid(user);

    if (!isUserValid.isValid) throw new Error(isUserValid.status);

    const { hash, salt } = await this.generatePassword(user.password);

    user.hash = hash;
    user.salt = salt;
    delete user.password;

    if (user.isAdmin === undefined) user.isAdmin = false;
    // console.log('CHEGOU AQUI ===');
    const newUser = usersRepository.create(user);
    // const newUser = user;

    await usersRepository.save(newUser);

    return newUser;
  }

  generatePassword(password: string): any {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { hash, salt };
  }
  
  isValid(user: UserRequest): Validation {
    if (!user) return { status: StatusResponseEnum.INVALID_USER, isValid: false };

    if (!validate(user.email)) return { status: StatusResponseEnum.INVALID_EMAIL, isValid: false };

    if (!user.firstName || user.firstName.length == 0) return { status: StatusResponseEnum.INVALID_FIRST_NAME, isValid: false };

    if (!user.password || user.password.length == 0) return { status: StatusResponseEnum.INVALID_PASSWORD, isValid: false };

    return { status: StatusResponseEnum.VALID, isValid: true };
  }
  
}
