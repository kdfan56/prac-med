import axios from 'axios';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
  token: string;
}

export const authApi = {
  signup: async (name: string, email: string, password: string): Promise<AuthUser> => {
    const { data } = await axios.post<AuthUser>('/api/auth/signup', { name, email, password });
    return data;
  },

  login: async (email: string, password: string): Promise<AuthUser> => {
    const { data } = await axios.post<AuthUser>('/api/auth/login', { email, password });
    return data;
  },

  getMe: async (token: string): Promise<AuthUser> => {
    const { data } = await axios.get<AuthUser>('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
