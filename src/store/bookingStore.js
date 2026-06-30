import { defineStore } from "pinia";
import { ref } from "vue";
import { createBooking, getBookingsByUserId } from "@/service/bookingService";
import { useAuthStore } from "./authStore";
import { getBookings } from "@/service/bookingService";
import { deleteBooking } from "@/service/bookingService";
import { bookingApproval } from "@/service/bookingService";
import { getBookingsStatistic } from "@/service/bookingService";


const errorMessages = {
    'ERR_NOT_FOUND': 'The room you are looking for no longer exists or has been deleted.',
    'ERR_ROOM_ALREADY_BOOKED': 'The room is already booked',
    'ERR_MISSING_FIELDS': 'Please fill in all required fields before saving.',
    'ERR_DATABASE': 'Our server is currently experiencing an issue. Please try again later.',
    'ERR_CREATE_FAILED': 'Failed to save the new room to the system.'
};


export const useBookingStore = defineStore("booking", () => {
    const bookingData = ref([]);
    const bookingDataStatistic = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const message = ref(null);


    const addBooking = async (roomId, startDate, endDate, startTime, endTime, purpose, status) => {
        isLoading.value = true;
        error.value = null;
        try {

            const startDateTime = startDate + " " + startTime;
            const endDateTime = endDate + " " + endTime;

            const authStore = useAuthStore();
            const userId = authStore.user?.id;

            const response = await createBooking(userId, roomId, startDateTime, endDateTime, purpose, status);

            if (response.status === 'success') {
                message.value = response.message;
                return true;
            }

        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchBookingsStatistic = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await getBookingsStatistic();
            bookingDataStatistic.value = response.data;

            if (response.status === 'success') {
                message.value = response.message;
                return true;
            }

        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        }
        finally {
            isLoading.value = false;
        }
    };

    const removeBooking = async (bookingId) => {
        try {
            isLoading.value = true;
            error.value = null;
            const response = await deleteBooking(bookingId);

            if (response.status == 'success') {
                message.value = response.message;
                bookingData.value = bookingData.value.filter(item => item.id !== bookingId);
                return true;
            }
        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        }
        finally {
            isLoading.value = false;
        }
    };


    const approvalBooking = async (bookingId, status) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await bookingApproval(bookingId, status);

            if (response.status == "success") {
                message.value = response.message;
                return true;
            }

        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        }
        finally {
            isLoading.value = false;
        }
    };

    const fetchBookingsByUserId = async (userId) => {
        isLoading.value = true;
        error.value = null;

        try {
            const authStore = useAuthStore();
            const userId = authStore.user?.id;
            const response = await getBookingsByUserId(userId);
            bookingData.value = response.data;

            if (response.status === 'success') {
                message.value = response.message;
                return true;
            }

        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        }
        finally {
            isLoading.value = false;
        }
    };

    const fetchBookings = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await getBookings();
            bookingData.value = response.data;

            if (response.status === 'success') {
                message.value = response.message;
                return true;
            }

        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        }
        finally {
            isLoading.value = false;
        }
    };

    return { bookingData, isLoading, error, addBooking, message, fetchBookings, removeBooking, approvalBooking, fetchBookingsByUserId, fetchBookingsStatistic, bookingDataStatistic };

});

