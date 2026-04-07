'use client';

import { Button } from '@/shared/ui/button/';
import { Input } from '@/shared/ui/input/Input';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription,
    CardContent,
    CardFooter 
} from '@/shared/ui/card';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, Phone } from 'lucide-react';
import InputMask from 'react-input-mask';

import ErrorToast from '@/shared/ui/error-toast/error-toast';
import IsLoadingComponent from '@/shared/ui/isLoading/isLoading';

import { TRegisterUserRequirments } from '@/entities/user';
import { useRegisterForm } from '../model/useRegisterForm';


export const registerSubmit = async (req: TRegisterUserRequirments): Promise<true | string> => {
    console.error('Login submit error:', 'error');
    return 'error';
};

export function RegisterForm() {
    const { err, handleSubmit, isLoading, setErr } = useRegisterForm({
        onSubmitRegister: registerSubmit
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');

    return (
        <div className="w-full max-w-md mx-auto">
            {isLoading && <IsLoadingComponent />}

            {err && (
                <ErrorToast
                    message={err}
                    onClose={() => setErr('')}
                />
            )}

            <Card className="relative overflow-hidden border border-orange-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-orange-500/10 backdrop-blur-sm">
                {/* Декоративный градиентный бордер сверху - оранжевый */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />
                
                {/* Декоративный фон - оранжевые свечения */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />

                <CardHeader className="space-y-2 pb-6 text-center">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        Создать аккаунт
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Поле Email */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Mail className="h-4 w-4 text-orange-400" />
                                Email
                            </label>
                            <Input
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                required
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-gray-800"
                            />
                        </div>

                        {/* Поле Телефон */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Phone className="h-4 w-4 text-orange-400" />
                                Номер телефона
                            </label>
                            <InputMask
                                mask="+7 (999) 999-99-99"
                                maskChar="_"
                                value={phoneValue}
                                onChange={(e) => setPhoneValue(e.target.value)}
                            >
                                {(inputProps) => (
                                    <Input
                                        {...inputProps}
                                        type="tel"
                                        placeholder="+7 (___) ___-__-__"
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-gray-800"
                                    />
                                )}
                            </InputMask>
                        </div>

                        {/* Поле Пароль */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Lock className="h-4 w-4 text-orange-400" />
                                Пароль
                            </label>
                            <div className="relative">
                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-gray-800 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Поле Повторить пароль */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Lock className="h-4 w-4 text-orange-400" />
                                Повторите пароль
                            </label>
                            <div className="relative">
                                <Input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-gray-800 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    <span className="text-white">Регистрируем...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-white" />
                                    <span className="text-white">Зарегистрироваться</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="relative justify-center gap-1 border-t border-gray-700/50 pt-6 text-sm">
                    <span className="text-gray-400">Уже есть аккаунт?</span>
                    <Link
                        href="/auth/login"
                        className="font-semibold text-orange-400 transition-colors hover:text-orange-300 hover:underline"
                    >
                        Войти
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}