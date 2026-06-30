import { defineStore } from 'pinia';
import { getUsers, updateUser } from '@/service/userService';
import { deleteUser } from '@/service/userService';
import { createUser } from '@/service/userService';
import { ref } from 'vue';


const errorMessages = {
  'ERR_NOT_FOUND': 'The room you are looking for no longer exists or has been deleted.',
  'ERR_MISSING_FIELDS': 'Please fill in all required fields before saving.',
  'ERR_DATABASE': 'Our server is currently experiencing an issue. Please try again later.',
  'ERR_CREATE_FAILED': 'Failed to save the new room to the system.'
};

export const useUserStore = defineStore('user', () => {
  // State (Setara dengan data di options API / ref di setup)
  const userData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const message = ref(null);

  // Actions (Setara dengan methods)
  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getUsers(); // Perbaikan: ubah 'users' jadi 'response'
      userData.value = response.data;

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


  const removeUser = async (userId) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await deleteUser(userId);

      if (response.status === 'success') {

        if (userData.value) {
          userData.value = userData.value.filter(user => user.id !== userId);
        }
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

  }


  const addUser = async (userName, email, role) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createUser(userName, email, role.toLowerCase());

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
  }

  const editUser = async (userId, userName, email, role) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await updateUser(userId, userName, email, role);

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
  }

  // Kembalikan state dan action yang ingin diakses dari luar
  return { userData, isLoading, error, message, fetchUsers, removeUser, addUser, editUser };
});