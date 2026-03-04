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
        await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};