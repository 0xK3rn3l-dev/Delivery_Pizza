

import { ValidateLoginDataService } from './model/login.model'
import { ValidateRegisterDataService } from './model/register.model'

export const publicValidateLoginData = new ValidateLoginDataService()
export const publicValidateRegisterData = new ValidateRegisterDataService()