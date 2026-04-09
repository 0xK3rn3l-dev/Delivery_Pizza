// frontend/src/features/auth/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Храним access_token в памяти
let accessToken: string | null = null;

// Флаг для предотвращения множественных запросов на обновление токена
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Получить текущий access_token
 */
export const getAccessToken = (): string | null => {
  return accessToken;
};

/**
 * Установить access_token
 */
export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};



/**
 * Очистить access_token
 */
export const clearAccessToken = (): void => {
  accessToken = null;
};

/**
 * Проверить, авторизован ли пользователь
 */
export const isAuthenticated = (): boolean => {
  return !!accessToken;
};

/**
 * Колбэки после успешного обновления токена
 */
const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

/**
 * Добавить колбэк в очередь
 */
const addRefreshSubscriber = (cb: (token: string) => void): void => {
  refreshSubscribers.push(cb);
};

/**
 * Обновление access_token через refresh_token (httpOnly cookie)
 */
export const refreshToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      addRefreshSubscriber((token: string) => {
        resolve(token);
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      clearAccessToken();
      throw new Error('Сессия истекла, войдите снова');
    }

    const data = await response.json();
    const newToken = data.access_token;
    
    setAccessToken(newToken);
    onRefreshed(newToken);
    
    return newToken;
    
  } catch (error) {
    clearAccessToken();
    throw error;
  } finally {
    isRefreshing = false;
  }
};

/**
 * Базовый fetch с автоматической авторизацией и обновлением токена
 */
export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // 👇 Исправление: используем Record<string, string> для заголовков
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Копируем существующие заголовки из options
  if (options.headers) {
    const existingHeaders = options.headers as Record<string, string>;
    Object.entries(existingHeaders).forEach(([key, value]) => {
      headers[key] = value;
    });
  }

  // Добавляем Authorization если есть токен
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // Выполняем запрос
  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  // Если 401 и не запрос на refresh — пробуем обновить токен
  if (response.status === 401 && !url.includes('/auth/refresh')) {
    try {
      const newToken = await refreshToken();
      
      // Обновляем заголовок с новым токеном
      headers['Authorization'] = `Bearer ${newToken}`;
      
      // Повторяем запрос с новым токеном
      response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
      });
    } catch (error) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      throw error;
    }
  }

  return response;
};


export const checkAuth = async (): Promise<boolean> => {
  // Если есть токен в памяти — сразу true
  if (accessToken) return true;
  
  // Пробуем обновить через refresh_token
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'GET',
      credentials: 'include',
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.access_token) {
        setAccessToken(data.access_token);
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
};


export const getCurrentUser = async () => {
  if (!accessToken) return null;
  
  try {
    const res = await fetch(`${API_BASE_URL}/my/profile`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });
    
    if (res.ok) {
      return res.json();
    }
    return null;
  } catch {
    return null;
  }
};




/**
 * GET запрос
 */
export const get = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  const response = await authFetch(url, { method: 'GET', ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message || 'Ошибка запроса');
  }
  
  return response.json();
};

/**
 * POST запрос
 */
export const post = async <T = any>(url: string, data?: any, options?: RequestInit): Promise<T> => {
  const response = await authFetch(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message || 'Ошибка запроса');
  }
  
  return response.json();
};

/**
 * PUT запрос
 */
export const put = async <T = any>(url: string, data?: any, options?: RequestInit): Promise<T> => {
  const response = await authFetch(url, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message || 'Ошибка запроса');
  }
  
  return response.json();
};

/**
 * DELETE запрос
 */
export const del = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  const response = await authFetch(url, {
    method: 'DELETE',
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message || 'Ошибка запроса');
  }
  
  return response.json();
};

/**
 * PATCH запрос
 */
export const patch = async <T = any>(url: string, data?: any, options?: RequestInit): Promise<T> => {
  const response = await authFetch(url, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message || 'Ошибка запроса');
  }
  
  return response.json();
};