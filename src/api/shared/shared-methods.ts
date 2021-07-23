import { validate } from 'email-validator';
import { getCustomRepository } from 'typeorm';

import { UserResponseMessage } from '@enums/user-response-message';
import { UserRequest } from '@interfaces/user-request';
import { Validation } from '@interfaces/validation';
import { UsersRepositories } from '@repositories/users';

export class SharedMethodsUsers {
  async getUserById(id?: string): Promise<boolean> {
    const usersRepository = getCustomRepository(UsersRepositories); 
    const user = await usersRepository.findOne(id);
    return user ? true : false;
  }

  isPasswordValid(password: string): boolean {
    return password
            && password.length >= 8     
            && /[A-Z]/g.test(password)  
            && /[0-9]/g.test(password);  
  }

  isValid(user: UserRequest): Validation {
    if (!user) return { status: UserResponseMessage.INVALID_USER, isValid: false };

    if (!validate(user.email)) return { status: UserResponseMessage.INVALID_EMAIL, isValid: false };

    if (!user.firstName || user.firstName.length == 0) return { status: UserResponseMessage.INVALID_FIRST_NAME, isValid: false };

    if (!this.isPasswordValid(user.password)) return { status: UserResponseMessage.INVALID_PASSWORD, isValid: false };

    return { status: UserResponseMessage.VALID, isValid: true };
  }
  
}
