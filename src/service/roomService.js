
import { apiClient } from '@/config/api';


export const getRooms = async () => {
    try {

        const response = await apiClient.get(`/rooms`);
        return response.data;

    } catch (error) {

        throw error;
    }
};


export const createRoom = async (roomName, capacity, description, facilities, imageUrl) => {
    try {
        const response = await apiClient.post(`/rooms`, {
            roomName: roomName,
            capacity: capacity,
            description: description,
            facilities: facilities,
            imageUrl: imageUrl
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteRoom = async (roomId) => {
    try {
        const response = await apiClient.delete(`/rooms/${roomId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const editRoom = async (roomName, capacity, description, facilities, roomId) => {
    try {
        const response = await apiClient.put(`/rooms/${roomId}`, {
            roomName: roomName,
            capacity: capacity,
            description: description,
            facilities: facilities
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};