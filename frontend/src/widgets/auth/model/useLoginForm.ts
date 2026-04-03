'use client'


import { type TLoginUserRequirments } from '@/entities/user'
import { publicValidateLoginData } from '@/features/auth/index'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface UseLoginFormProps {
	onSubmitLogin: (data: TLoginUserRequirments) => Promise<true | string>
}

export function useLoginForm({ onSubmitLogin }: UseLoginFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setErr('')

        const form = new FormData(e.currentTarget)
        const email = form.get('email') as string
        const password = form.get('password') as string

        if (!email || !password) {
            setErr('Пожалуйста, заполните все поля')
            setIsLoading(false)
            return
        }

        if (typeof email !== 'string' || typeof password !== 'string') {
			setErr('Невалидные email и пароль')
			setIsLoading(false)
			return
		}

        const emailValidationError = publicValidateLoginData.validateEmail(email);
		if (typeof emailValidationError === 'string') {
		    setErr(emailValidationError);
		    setIsLoading(false);
		    return;
		}

		// Валидация Пароля
		const passwordValidationError = publicValidateLoginData.validatePassword(password);
		if (typeof passwordValidationError === 'string') {
		    setErr(passwordValidationError);
		    setIsLoading(false);
		    return;
		}


        try {
            const result = await onSubmitLogin({ email, password })
            if (result === true) {
                router.push('/profile')
            } else {
                setErr(result ?? 'Ошибка входа')
                setIsLoading(false)
                return
            }
        } catch (error) {
            setErr('Произошла ошибка при входе. Пожалуйста, попробуйте снова.')
        }
    

    }
    return (
        { handleSubmit, isLoading, err, setErr}
    )
}