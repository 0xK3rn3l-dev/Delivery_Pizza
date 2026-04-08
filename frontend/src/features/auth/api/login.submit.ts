// frontend/src/features/auth/api/login.submit.ts
import { post, setAccessToken, clearAccessToken } from './client';

interface LoginCredentials {
  email: string;
  phone: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user_data: {
    id: number;
    email: string;
    phone?: string;
    role: string;
    userName?: string;
    isVerified?: boolean;
  };
}

export const loginSubmit = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  clearAccessToken();

  try {
    const data = await post<LoginResponse>('/auth/login', credentials);
    
    if (data.access_token) {
      setAccessToken(data.access_token);
    }
    
    return data;
    
  } catch (error) {
    clearAccessToken();
    throw error;
  }
};