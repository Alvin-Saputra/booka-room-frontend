import axios from 'axios';

// 1. Buat instance axios dengan konfigurasi dasar
export const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
});
