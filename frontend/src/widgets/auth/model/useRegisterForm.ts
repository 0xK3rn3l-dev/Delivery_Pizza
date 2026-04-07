'use client'

import { TRegisterUserRequirments } from '@/entities/user'
import { publicValidateRegisterData } from '@/features/auth/index'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface UseRegisterFormProps {
	onSubmitRegister: (data: TRegisterUserRequirments) => Promise<true | string>
}

// Создаю хук по работе с формой логина, соответствуя правилам headless компонентам.
export function useRegisterForm({ onSubmitRegister }: UseRegisterFormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [err, setErr] = useState<string>('')
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		
		e.preventDefault();
		
		// Реинициализация дефолтных значений
		setIsLoading(true)
		setErr('')

		const form = new FormData(e.currentTarget)

		const email = form.get('email')
		const password = form.get('password')
		const confirmPassword = form.get('confirmPassword')

		// Сужение типов для email и 2-ух паролей засчет проверки на соответствие строковому типу.
		if (typeof email !== 'string' || typeof password !== 'string' || typeof confirmPassword !== 'string') {
			setErr('Невалидные email и пароль')
			setIsLoading(false)
			return
		}

		// Проверка совпадения паролей пока не через сервис		
		if (password !== confirmPassword) {
			setErr('Пароли не совпадают')
			setIsLoading(false)
			return
		}

		// Валидация данных через сервис
		const emailValidation = publicValidateRegisterData.validateEmail(email)
		//string
		if (typeof emailValidation === 'string') {
			setErr(emailValidation) // Здесь будет сообщение об ошибке
			setIsLoading(false)
			return
		}
	
		const passwordValidation = publicValidateRegisterData.validatePassword(password)
		//string
		if (typeof passwordValidation === 'string') {
			setErr(passwordValidation) // Здесь будет сообщение об ошибке
			setIsLoading(false)
			return
		}


		
		const res = await onSubmitRegister({ email, password })

		if (res !== true) {
			setErr(res ?? 'Ошибка регистрации')
			setIsLoading(false)
			return
		}

		router.replace('/')
		// Вернуть все в дефолтные значения
		setIsLoading(false)
		setErr('')
	}

	return {
		isLoading,
		err,
		setErr,
		handleSubmit
	}
}
