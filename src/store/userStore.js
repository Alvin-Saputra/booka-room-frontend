import { defineStore } from 'pinia';
import { getUsers } from '@/service/user-service';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State (Setara dengan data di options API / ref di setup)
  const userData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Actions (Setara dengan methods)
  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const users = await getUsers();
      userData.value = users;
    } catch (err) {
      console.error('Error fetching users:', err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteUser = (userId) => {
    try {
      isLoading.value = true;
      error.value = null;
      const isSuccess = deleteUser
    } catch (err) {

    }
  }

  // Kembalikan state dan action yang ingin diakses dari luar
  return { userData, isLoading, error, fetchUsers };
});