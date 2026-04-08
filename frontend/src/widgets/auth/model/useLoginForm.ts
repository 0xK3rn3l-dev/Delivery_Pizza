// frontend/src/features/auth/model/useLoginForm.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginSubmit } from '@/features/auth/api/login.submit';

interface LoginCredentials {
  email: string;
  phone: string;
  password: string;
}

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErr('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    // Валидация телефона (проверяем, что не пустой и не только маска)
    const cleanPhone = phone.replace(/\D/g, ''); // убираем все не цифры
    if (!cleanPhone || cleanPhone.length < 11) {
      setErr('Введите корректный номер телефона');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginSubmit({ email, phone, password });
      
      console.log('Успешный вход:', response.user_data);
      
      const redirectTo = localStorage.getItem('redirect_after_login');
      localStorage.removeItem('redirect_after_login');
      router.push(redirectTo || '/');
      
    } catch (error: any) {
      setErr(error.message || 'Ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    err,
    setErr,
    handleSubmit,
  };
};