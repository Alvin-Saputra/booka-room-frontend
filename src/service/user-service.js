import axios from 'axios';
import { apiClient } from '@/config/api';


export const getUsers = async () => {
    try {

        const response = await apiClient.get(`/users`);
        return response.data;

    } catch (error) {

        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data; // <-- ini yang benar
    } catch (err) {
        throw err;
    }
};


export const createUser = async (userName, email, role) => {
    try {
        const response = await apiClient.post(`/users`, {
            userName: userName,
            email: email,
            role: role
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const updateUser = async (userId, userName, email, role) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, {
            userName: userName,
            email: email,
            role: role
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}