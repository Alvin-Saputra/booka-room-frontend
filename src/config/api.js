import axios from 'axios';

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
});
