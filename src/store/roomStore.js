import { defineStore } from "pinia";
import {
  createRoom,
  getRooms,
  deleteRoom,
  editRoom,
  getRoomsById,
} from "@/service/roomService";
import { uploadImageToCloudinary } from "@/service/cloudinaryService";
import { ref } from "vue";
import { trueColor } from "@cloudinary/url-gen/qualifiers/colorSpace";


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

      if (response.status === "success") {
        message.value = "Data User Room diambil.";
        return true;
      } else {
        message.value = "Data User Room diambil.";
        return false;
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      error.value = err;
      message.value = "Terjadi kesalahan pada server.";
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

      if (response.status === "success") {
        message.value = "Data Room Berhasil Diambil.";
        return true;

      }
      else {
        message.value = "Data Room Gagal Diambil.";
        return false;
      }

    } catch (err) {
      error.value = err;
      message.value = "Terjadi kesalahan pada server.";
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
      console.log("Cloud Name yang ditarik:", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      let imageUrl = null;

      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        imageUrl = uploadResult.secure_url;
      } else if (!imageFile) {
        message.value = "Gagal menambahkan room. Gambar tidak ditemukan.";
        return false;
      }

      const response = await createRoom(
        roomName,
        capacity,
        description,
        facilities,
        imageUrl,
      );
      if (response.status === "success") {
        console.log("ini adalah" + response.status);
        fetchRooms();
        message.value = "Data Room Berhasil di Tambahkan";
        return true;
      } else {
        message.value = "Data Room Gagal di Tambahkan";
        return false;
      }
    } catch (err) {
      console.error("Error adding room:", err);
      error.value = err;
      return false;
    } finally {
      isLoading.value = false;
      // return false;
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
        message.value = "Data Room Berhasil di Hapus";
        isLoading.value = false;
        return true;
      } else {
        message.value = "Data Room Gagal di Hapus";
        isLoading.value = false;
        return false;
      }
    } catch (err) {
      console.error("Error deleting room:", err);
      error.value = err;
      isLoading.value = false;
      message.value = "Gagal Mengahapus Data room";
      return false;
    }
  };

  const updateRoom = async (
    roomName,
    capacity,
    description,
    facilities,
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
        id,
      );

      if (response.status === "success") {
        await fetchRooms();
        message.value = "Data Room Berhasil diubah.";
        isLoading.value = false;
        return true;
      } else {
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
