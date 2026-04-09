// frontend/src/features/auth/model/useAuth.ts
import { useState, useEffect } from 'react';
import { checkAuth, getAccessToken } from '../api/client';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
      
      if (auth) {
        // Получаем данные пользователя
        try {
          const res = await fetch('http://localhost:3000/my/profile', {
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${getAccessToken()}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
      
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  return { isAuthenticated, isLoading, user };
};