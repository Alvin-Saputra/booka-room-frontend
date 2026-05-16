import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

// 1. Buat instance axios dengan konfigurasi dasar
export const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
},

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();

    // Jika token expired / unauthorized
    if (error.response && error.response.status === 401) {
      authStore.logout();
    }

    return Promise.reject(error);
  }
)
);
