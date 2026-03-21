import { defineStore } from "pinia";
import { ref } from "vue";
import { createBooking, getBookingsByUserId } from "@/service/bookingService";
import { useAuthStore } from "./authStore";
import { getBookings } from "@/service/bookingService";
import { deleteBooking } from "@/service/bookingService";
import { bookingApproval } from "@/service/bookingService";


export const useBookingStore = defineStore("booking", () => {
    const bookingData = ref([]);
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
                console.log("ini adalah" + response.status)
                // fetchRooms();
                message.value = 'Booking Room Berhasil di Buat';
                return true;
            }
            else {
                message.value = 'Booking Gagal Dibuat';
                return false;
            }

        } catch (err) {
            console.error('Error adding room:', err);
            error.value = err;
            return false;
        } finally {
            isLoading.value = false;
            // return false;
        }
    }

    const fetchBookings = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await getBookings();
            bookingData.value = response.data;

            if (response.status === 'success') {
                message.value = "Data Booking Berhasil diambil.";
                return true;
            } else {
                message.value = "Data Booking Gagal diambil.";
                return false;
            }

        } catch (err) {
            console.error('Error fetching booking data:', err);
            error.value = err;
            message.value = "Terjadi kesalahan pada server.";
            return false;
        }
        finally {
            isLoading.value = false;
        }
    }

    const removeBooking = async (bookingId) => {
        try {
            isLoading.value = true;
            error.value = null;
            const response = await deleteBooking(bookingId);

            if (response.status == 'success') {
                message.value = "Data Booking Berhasil dihapus.";
                bookingData.value = bookingData.value.filter(item => item.id !== bookingId);
                isLoading.value = false;
                return true;
            }
            else {
                message.value = "Data Booking Gagal Dihapus";
                isLoading.value = false;
                return false;
            }
        } catch (err) {
            console.log('Error remove booking data:', err);
            error.value = err;
            message.value = "Terjadi kesalahan pada server.";
            isLoading.value = false;
            return false;
        }
        finally {
            isLoading.value = false;
        }
    }


    const approvalBooking = async (bookingId, status) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await bookingApproval(bookingId, status);

            if (response.status == "success") {
                message.value = "Booking Berhasil di " + status;
                isLoading.value = false;
                fetchBookings();
                return true;
            }
            else {
                message.value = "Booking Gagal di " + status;
                isLoading.value = false;
                return false;
            }

        } catch (err) {
            console.log('Error approval booking data:', err);
            error.value = err;
            message.value = "Terjadi kesalahan pada server.";
            isLoading.value = false;
            return false;
        }

    }

    const fetchBookingsByUserId = async (userId) => {
        isLoading.value = true;
        error.value = null;

        try {
            const authStore = useAuthStore();
            const userId = authStore.user?.id;
            const response = await getBookingsByUserId(userId);
            bookingData.value = response.data;

            if (response.status === 'success') {
                message.value = "Data Booking Berhasil diambil.";
                return true;
            } else {
                message.value = "Data Booking Gagal diambil.";
                return false;
            }

        } catch (err) {
            console.error('Error fetching booking data:', err);
            error.value = err;
            message.value = "Terjadi kesalahan pada server.";
            return false;
        }
        finally {
            isLoading.value = false;
        }
    }

    return { bookingData, isLoading, error, addBooking, message, fetchBookings, removeBooking, approvalBooking, fetchBookingsByUserId };

});

