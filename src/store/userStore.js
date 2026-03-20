import { defineStore } from 'pinia';
import { getUsers, updateUser } from '@/service/user-service';
import { deleteUser } from '@/service/user-service';
import { createUser } from '@/service/user-service';
import { ref } from 'vue';

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
        message.value = "Data User Berhasil diambil.";
        return true;
      } else {
        message.value = "Data User Gagal diambil.";
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


  const removeUser = async (userId) => {
    try {
      isLoading.value= true;
      error.value = null;
      const response = await deleteUser(userId);

      if (response.status === 'success') {

       if (userData.value) {
        userData.value = userData.value.filter(user => user.id !== userId);
      }
        message.value = "Data User Berhasil di Hapus";
        isLoading.value = false;
        return true;

      }
      else {
        message.value = "Data User Gagal di Hapus";
        isLoading.value = false;
        return false;
      }

    } catch (err) {
      console.error('Error deleting user:', err);
      error.value = err;
      message.value = "Gagal Mengahapus Data User";
      return false;
    }

  }


  const addUser = async (userName, email, role) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createUser(userName, email, role.toLowerCase());

      if (response.status === 'success') {
        console.log("ini adalah" + response.status)
        await fetchUsers();
        message.value = 'Data User Berhasil di Tambahkan';
        return true;
      }
      else {
        message.value = 'Data User Gagal di Tambahkan';
        return false;
      }

    } catch (err) {
      console.error('Error adding user:', err);
      error.value = err;
      return false;
    } finally {
      isLoading.value = false;
      // return false;
    }
  }

  const editUser = async (userId, userName, email, role) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await updateUser(userId, userName, email, role);

      if (response.status === 'success') {
        await fetchUsers();
        message.value = "Berhasil Mengubah Data User";
        isLoading.value = true;
        return true;
      }
      else {
        message.value = "Gagal Mengubah Data User";
        isLoading.value = false;
        return false;
      }
    } catch (err) {
      console.error('Error adding user:', err);
      error.value = err;
      return false;
    }
    finally {
      isLoading.value = false;
    }
  }

  // Kembalikan state dan action yang ingin diakses dari luar
  return { userData, isLoading, error, message, fetchUsers, removeUser, addUser, editUser };
});