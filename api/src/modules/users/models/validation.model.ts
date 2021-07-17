import { StatusResponseEnum } from 'modules/enums/status-responses.enum';

export interface Validation {
    status: StatusResponseEnum;
    isValid: boolean;
}
