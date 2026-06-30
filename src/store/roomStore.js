import { defineStore } from "pinia";
import {
  createRoom,
  getRooms,
  deleteRoom,
  editRoom,
  getRoomsById,
} from "@/service/roomService";
import { ref } from "vue";

const errorMessages = {
  'ERR_ROOM_NOT_FOUND': 'The room you are looking for no longer exists or has been deleted.',
  'ERR_MISSING_FIELDS': 'Please fill in all required fields before saving.',
  'ERR_INVALID_INPUT': 'Capacity must be a number greater than 0.',
  'ERR_DATABASE': 'Our server is currently experiencing an issue. Please try again later.',
  'ERR_CREATE_FAILED': 'Failed to save the new room to the system.'
};

export const useRoomStore = defineStore("room", () => {
  // State (Setara dengan data di options API / ref di setup)
  const roomData = ref(null);
  const roomsData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const message = ref(null);

  // Actions (Setara dengan methods)
  const fetchRooms = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getRooms();
      roomsData.value = response.data;
      return true;

    } catch (err) {
      const code = err.response?.data?.errorCode
      error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
      return false;
    } finally {
      isLoading.value = false;
    }
  };


  const fetchRoomById = async (roomdId) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await getRoomsById(roomdId);
      roomData.value = response.data;
      message.value = response.message;
      return true;

    } catch (err) {
      const code = err.response?.data?.errorCode
      error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  const addRoom = async (
    roomName,
    capacity,
    description,
    facilities,
    imageFile,
  ) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await createRoom(
        roomName,
        capacity,
        description,
        facilities,
        imageFile,
      );
      if (response.status === "success") {
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

  const removeRoom = async (roomId) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await deleteRoom(roomId);

      if (response.status === "success") {
        if (roomsData.value) {
          roomsData.value = roomsData.value.filter((room) => room.id !== roomId);
        }
        message.value = response.message;
        return true;
      }
    } catch (err) {
      const code = err.response?.data?.errorCode
      error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
      return false;
    }
    finally{
      isLoading.value = false;
    }
  };

  const updateRoom = async (
    roomName,
    capacity,
    description,
    facilities,
    imageFile,
    id,
  ) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await editRoom(
        roomName,
        capacity,
        description,
        facilities,
        imageFile,
        id,
      );

      if (response.status === "success") {
        message.value = response.message;
        return true;
      } 
    } catch (err) {
      const code = err.response?.data?.errorCode
      error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
      return false;
    }
    finally{
      isLoading.value = false;
    }
  };

  // Kembalikan state dan action yang ingin diakses dari luar
  return {
    roomsData,
    roomData,
    isLoading,
    error,
    fetchRooms,
    fetchRoomById,
    addRoom,
    removeRoom,
    updateRoom,
    message,
  };
});
