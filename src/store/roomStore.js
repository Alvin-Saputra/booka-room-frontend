import { defineStore } from 'pinia';
import { createRoom, getRooms, deleteRoom, editRoom } from '@/service/room-service';
import { ref } from 'vue';

export const useRoomStore = defineStore('room', () => {
  // State (Setara dengan data di options API / ref di setup)
  const roomData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const message = ref(null);

  // Actions (Setara dengan methods)
  const fetchRooms = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getRooms();
      roomData.value = response.data;

      if (response.status === 'success') {
        message.value = "Data User Room diambil.";
        return true;
      } else {
        message.value = "Data User Room diambil.";
        return false;
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      error.value = err;
      message.value = "Terjadi kesalahan pada server.";
      return false;
    } finally {
      isLoading.value = false;
    }
  };


  const addRoom = async (roomName, capacity) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createRoom(roomName, capacity);

      if (response.status === 'success') {
        console.log("ini adalah" + response.status)
        fetchRooms();
        message.value = 'Data Room Berhasil di Tambahkan';
        return true;
      }
      else {
        message.value = 'Data Room Gagal di Tambahkan';
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

  const removeRoom = async (roomId) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await deleteRoom(roomId);

      if (response.status === 'success') {

        if (roomData.value) {
          roomData.value = roomData.value.filter(room => room.id !== roomId);
        }
        message.value = "Data Room Berhasil di Hapus";
        isLoading.value = false;
        return true;

      }
      else {
        message.value = "Data Room Gagal di Hapus";
        isLoading.value = false;
        return false;
      }

    } catch (err) {
      console.error('Error deleting room:', err);
      error.value = err;
      isLoading.value = false;
      message.value = "Gagal Mengahapus Data room";
      return false;
    }

  }

  const updateRoom = async (roomName, capacity, Id) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await editRoom(roomName, capacity, Id);

      if (response.status === 'success') {
        await fetchRooms();
        message.value = "Data Room Berhasil diubah.";
        isLoading.value = false;
        return true;
      }
      else {
        isLoading.value = false;
        message.value = "Data Room Gagal diubah.";
        return false;
      }
    } catch (err) {
      error.value = err;
      message.value = "Gagal Mengubah data room";
      isLoading.value = false;
      return false;
    }
  }

  // Kembalikan state dan action yang ingin diakses dari luar
  return { roomData, isLoading, error, fetchRooms, addRoom, removeRoom, updateRoom, message };
});