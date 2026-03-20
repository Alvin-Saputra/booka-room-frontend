import { apiClient } from "@/config/api";

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}