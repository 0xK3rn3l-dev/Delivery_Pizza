import type { TLoginUserRequirments } from '@/entities/user/index'
import { GlobalConstsValidation } from '@/shared/config/auth/index'
import * as z from 'zod'

const emailSchema = z.email('Некорректный email')
const passwordSchema = z
	.string()
	.regex(
		GlobalConstsValidation.getPasswordRegex(),
		{ message: 'Пароль или Email введен неверно'})
	.min(8, { message: 'Пароль должен содержать минимум 8 символов' })

const phoneSchema = z
  .string()
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Номер телефона должен быть в формате +7 (999) 999-99-99'
  })
  .min(18, { message: 'Номер телефона должен содержать 11 цифр' })
  .max(18, { message: 'Номер телефона должен содержать 11 цифр' });




const loginRequirementsSchema = z.strictObject({
	email: emailSchema,
	phone: phoneSchema,
	password: passwordSchema
})



export class ValidateLoginDataService {
	private readonly emailSchema = emailSchema
	private readonly passwordSchema = passwordSchema
	private readonly phoneSchema = phoneSchema;  
	private readonly loginSchema = loginRequirementsSchema

	constructor() {}

	/**
	 * Проверяет только email.
	 * Возвращает true или строку с ошибкой, не кидает исключение.
	 */
	validateEmail(
		email: Pick<TLoginUserRequirments, 'email'>['email']
	): true | string {
		const result = this.emailSchema.safeParse(email)
		if (result.success) return true
		return result.error.issues[0].message || 'Некорректный email'
	}

	/**
	 * Проверяет только пароль.
	 * Возвращает true или строку с ошибкой, не кидает исключение.
	 */
	validatePassword(
		password: Pick<TLoginUserRequirments, 'password'>['password']
	): true | string {
		const result = this.passwordSchema.safeParse(password)
		if (result.success) return true
		return result.error.issues[0].message || 'Некорректный пароль'
	}


	validatePhone(phone: string): true | string {
    	const result = this.phoneSchema.safeParse(phone);
    	if (result.success) return true;
    	return result.error.issues[0]?.message || 'Некорректный номер телефона';
  	}



	/**
	 * Проверяет весь объект логина.
	 */
	validateTLoginUserRequirments(
		loginRequirment: TLoginUserRequirments
	): true | string[] {
		const result = this.loginSchema.safeParse(loginRequirment)
		if (result.success) return true
		return result.error.issues.map(issue => issue.message)
	}
}
