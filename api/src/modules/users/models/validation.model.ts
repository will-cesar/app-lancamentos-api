import { UserResponseMessageEnum } from 'enums/user-response-message.enum';

export interface Validation {
    status: UserResponseMessageEnum;
    isValid: boolean;
}
