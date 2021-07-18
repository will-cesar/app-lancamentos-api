import { pbkdf2Sync, randomBytes } from 'crypto';
import { validate } from 'email-validator';
import { UserResponseMessageEnum } from 'enums/user-response-message.enum';
import { UsersRepositories } from 'repositories/users.repository';
import { getCustomRepository } from 'typeorm';
import SuccessResponse from 'utilities/SuccessResponse';
import ValidationError from 'utilities/ValidationError';

import { GeneratePassword } from '../models/generate-password.model';
import { UserRequest } from '../models/user-request.model';
import { Validation } from '../models/validation.model';

class CreateUserService {

  private async checkIfUserExists(email: string): Promise<boolean> {
    const usersRepository = getCustomRepository(UsersRepositories); 
    const user = await usersRepository.findOne({ email });
    return user ? true : false;
  }

  async execute(user: UserRequest): Promise<SuccessResponse | UserResponseMessageEnum> {
    const usersRepository = getCustomRepository(UsersRepositories); 

    const isUserValid = await this.isValid(user);

    if (!isUserValid.isValid) throw new ValidationError(isUserValid.status, 400);
    
    const userAlreadyExists = await this.checkIfUserExists(user.email);

    if (userAlreadyExists) throw new ValidationError(UserResponseMessageEnum.USER_ALREADY_EXISTS, 400);

    const { hash, salt } = await this.generatePassword(user.password);

    user.hash = hash;
    user.salt = salt;
    delete user.password;

    if (user.isAdmin === undefined) user.isAdmin = false;

    const newUser = usersRepository.create(user);

    await usersRepository.save(newUser);

    return new SuccessResponse(newUser, UserResponseMessageEnum.SUCCESS_CREATED, 201); 
  }

  private generatePassword(password: string): GeneratePassword {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { hash, salt };
  }

  private isPasswordValid(password: string): boolean {
    return password
            && password.length >= 8     
            && /[A-Z]/g.test(password)  
            && /[0-9]/g.test(password);  
  }
  
  private isValid(user: UserRequest): Validation {
    if (!user) return { status: UserResponseMessageEnum.INVALID_USER, isValid: false };

    if (!validate(user.email)) return { status: UserResponseMessageEnum.INVALID_EMAIL, isValid: false };

    if (!user.firstName || user.firstName.length == 0) return { status: UserResponseMessageEnum.INVALID_FIRST_NAME, isValid: false };

    if (!this.isPasswordValid(user.password)) return { status: UserResponseMessageEnum.INVALID_PASSWORD, isValid: false };

    return { status: UserResponseMessageEnum.VALID, isValid: true };
  }  
  
}

export default CreateUserService;
