import { defineStore } from 'pinia';
import { getRooms } from '@/service/room-service';
import { ref } from 'vue';

export const useRoomStore = defineStore('room', () => {
  // State (Setara dengan data di options API / ref di setup)
  const roomData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Actions (Setara dengan methods)
  const fetchRooms = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const rooms = await getRooms();
      roomData.value = rooms;
    } catch (err) {
      console.error('Error fetching rooms:', err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };



  // Kembalikan state dan action yang ingin diakses dari luar
  return { roomData: roomData, isLoading, error, fetchRooms: fetchRooms };
});