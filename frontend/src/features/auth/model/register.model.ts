import type { TRegisterUserRequirments } from '@/entities/user/index'
import { GlobalConstsValidation } from '@/shared/config/auth/index'
import * as z from 'zod'

const emailSchema = z.email('Некорректный email')
const passwordSchema = z
	.string()
	.regex(
		GlobalConstsValidation.getPasswordRegex(),
		{ message: 'Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и нижние подчеркивание'})
	.min(8, { message: 'Пароль должен содержать минимум 8 символов' })

const phoneSchema = z
  .string()
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
	message: 'Номер телефона должен быть в формате +7 (999) 999-99-99'
  })
  .min(18, { message: 'Номер телефона должен содержать 11 цифр' })
  .max(18, { message: 'Номер телефона должен содержать 11 цифр' });


const registerRequirementsSchema  = z.strictObject({
	email: emailSchema,
	phone: phoneSchema,
	password: passwordSchema
})

export class ValidateRegisterDataService {
	private readonly emailSchema = emailSchema
	private readonly passwordSchema = passwordSchema
	private readonly phoneSchema = phoneSchema
	private readonly registerSchema = registerRequirementsSchema 

	constructor() {}

	/**
	 * Проверяет только email.
	 * Возвращает true или строку с ошибкой, не кидает исключение.
	 */
	validateEmail(
		email: Pick<TRegisterUserRequirments, 'email'>['email']
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
		password: Pick<TRegisterUserRequirments, 'password'>['password']
	): true | string {
		const result = this.passwordSchema.safeParse(password)
		if (result.success) return true
		return result.error.issues[0].message || 'Некорректный пароль'
	}

	//проверка освпадения паролей <Сервис>
	validatePasswordsMatch(password: string, confirmPassword: string): true | string {
			if (password !== confirmPassword) {
				return 'Пароли не совпадают'
			}
			return true
	}

	validatePhone(phone: string): true | string {
    	const result = this.phoneSchema.safeParse(phone);
    	if (result.success) return true;
    	return result.error.issues[0]?.message || 'Некорректный номер телефона';
  	}

	/**
	 * Проверяет весь объект логина.
	 */
	validateTRegisterUserRequirments(
		registerRequirment: TRegisterUserRequirments
	): true | string[] {
		const result = this.registerSchema.safeParse(registerRequirment)
		if (result.success) return true
		return result.error.issues.map(issue => issue.message)
	}
}
