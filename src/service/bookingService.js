import { apiClient } from "@/config/api";

export const createBooking = async (userId, roomId, startDateTime, endDateTime, purpose, status) => {
    try {
        const response = await apiClient.post(`/bookings`, {
            userId: userId,
            roomId: roomId,
            startTime: startDateTime,
            endTime: endDateTime,
            purpose: purpose,
            status: status
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getBookings = async () => {

    try {
        const response = await apiClient.get('/bookings');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteBooking = async (bookingId) => {
    try {
        const response = await apiClient.delete(`/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const bookingApproval = async (bookingId, status) => {
    try {
        const response = await apiClient.put(`/bookings/approval/${bookingId}`, {
            status: status
        });
        return response.data;
    } catch (error) {
        throw error;

    }
}

