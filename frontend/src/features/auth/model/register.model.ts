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

const loginRequirementsSchema = z.strictObject({
	email: emailSchema,
	password: passwordSchema
})

export class ValidateRegisterDataService {
	private readonly emailSchema = emailSchema
	private readonly passwordSchema = passwordSchema
	private readonly loginSchema = loginRequirementsSchema

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



	/**
	 * Проверяет весь объект логина.
	 */
	validateTRegisterUserRequirments(
		loginRequirment: TRegisterUserRequirments
	): true | string[] {
		const result = this.loginSchema.safeParse(loginRequirment)
		if (result.success) return true
		return result.error.issues.map(issue => issue.message)
	}
}
