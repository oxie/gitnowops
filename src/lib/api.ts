import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const inquiries = {
  getAll: async () => {
    const response = await api.get('/inquiries');
    return response.data;
  },

  create: async (data: { title: string; description: string }) => {
    const response = await api.post('/inquiries', data);
    return response.data;
  }
};

export default api;