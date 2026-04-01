'use client';

import { useState, useCallback } from 'react';
import { sanitizeInput } from './sanitize';

export const useSafeForm = <T extends Record<string, string>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((name: keyof T, value: string) => {
    const safeValue = sanitizeInput(value);
    setValues(prev => ({ ...prev, [name]: safeValue }));
    
    // Очищаем ошибку для этого поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const setValue = useCallback((name: keyof T, value: string) => {
    const safeValue = sanitizeInput(value);
    setValues(prev => ({ ...prev, [name]: safeValue }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    setValue,
    reset,
    setErrors,
  };
};