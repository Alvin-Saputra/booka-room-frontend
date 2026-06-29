import { apiClient } from "@/config/api";

export const getRooms = async () => {
  try {
    const response = await apiClient.get(`/rooms`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRoomsById = async (roomId) => {
  try {
    const response = await apiClient.get(`rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createRoom = async (
  roomName,
  capacity,
  description,
  facilities,
  image
) => {
  try {
    const formData = new FormData();

    formData.append("roomName", roomName);
    formData.append("capacity", capacity);
    formData.append("description", description);
    formData.append("facilities", facilities);
    formData.append("image", image);

    const response = await apiClient.post("/rooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await apiClient.delete(`/rooms/${roomId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const editRoom = async (
  roomName,
  capacity,
  description,
  facilities,
  image,
  roomId,
) => {
  try {

    const formData = new FormData();

    formData.append("roomName", roomName);
    formData.append("capacity", capacity);
    formData.append("description", description);
    formData.append("facilities", facilities);
    formData.append("image", image);

    const response = await apiClient.put(`/rooms/${roomId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


    return response.data;
  } catch (err) {
    throw err;
  }
};
