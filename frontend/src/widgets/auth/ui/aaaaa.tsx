// src/features/auth/ui/LoginForm.tsx
'use client';

import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Mail, Lock, LogIn } from 'lucide-react';

export const LoginForm = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <Card
                    className="w-[400px] h-[700px]"
                    title="Вход в аккаунт"
                    subtitle="Введите email и пароль для входа"
                    icon={<LogIn className="h-6 w-6 text-orange-500" />}
                    variant="auth"
                    padding="lg"
                    footer={
                        <div className="text-center text-sm">
                            <span className="text-gray-500">Нет аккаунта?</span>{' '}
                            <button className="text-orange-500 hover:text-orange-600 font-medium">
                                Зарегистрироваться
                            </button>
                        </div>
                    }
                >
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="example@mail.com"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Пароль
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        
                        <Button type="submit" variant="primary" size="lg" className="w-full">
                            Войти
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};