<script setup>
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue';
import AddUserDialog from '@/components/admin/AddUserDialog.vue';
import EditUserDialog from '@/components/admin/EditUserDialog.vue';
import Alert from '@/components/common/Alert.vue';


const userStore = useUserStore();
const { userData, isLoading, message } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.fetchUsers();
});

const showDeleteDialog = ref(false);
const showAddUserDialog = ref(false);
const showEditUserDialog = ref(false);
const search = ref('');
// const selectedUserId = ref(null);
const selectedUser = reactive({
  id: null,
  name: '',
  email: '',
  role: ''
});

const alertConfig = reactive({
  show: false,
  type: 'success',
  title: 'Success',
  message: ''
});

const openDeleteDialog = (user) => {
  selectedUser.id = user.id; // Simpan id ke selectedUser
  showDeleteDialog.value = true;
};

const openAddUserDialog = () => {
  showAddUserDialog.value = true;
};

const openEditUserDialog = (user) => {
  selectedUser.id = user.id;
  selectedUser.name = user.user_name;
  selectedUser.email = user.email;
  selectedUser.role = user.role;
  showEditUserDialog.value = true;
}


const handleAddUser = async (name, email, role) => {
  const isSuccess = await userStore.addUser(name, email, role);
  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showAddUserDialog.value = false;
  }
  else {
    triggerAlert('error', 'Error', message);
    showAddUserDialog.value = false;
  }

}


const handleDeleteUser = async () => {
  if (!selectedUser.id) return;

  const isSuccess = await userStore.removeUser(selectedUser.id);

  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showDeleteDialog.value = false;
    selectedUser.id = null;
  }
  else {
    triggerAlert('error', 'Error', message);
    showDeleteDialog.value = false;
    selectedUser.id = null;
  }

};

const handleEditUser = async (name, email, role) => {
  const isSuccess = await userStore.editUser(selectedUser.id, name, email, role);

  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showEditUserDialog.value = false;
    selectedUser.id = null;
    selectedUser.name = '';
    selectedUser.email = '';
    selectedUser.role = '';
  }
  else {
    triggerAlert('error', 'Error', message);
    showEditUserDialog.value = false;
    selectedUser.id = null;
    selectedUser.name = '';
    selectedUser.email = '';
    selectedUser.role = '';
  }
}

const triggerAlert = (type, title, msg) => {
  alertConfig.type = type;
  alertConfig.title = title;
  alertConfig.message = msg;
  alertConfig.show = true;
};

const headers = [
  { title: 'User Code', align: 'start', key: 'user_code' },
  { title: 'User Name', align: 'start', key: 'user_name' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Role', align: 'start', key: 'role' },
  { title: 'Actions', align: 'center', key: 'actions', sortable: false }
];


</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div class="flex-col items-center gap-2">
        <h1 class="text-3xl font-bold text-gray-800">
          Manajemen Ruangan
        </h1>

        <p class="text-gray-500 mt-1">
          Atur Data Pengguna Anda
        </p>
      </div>

    </div>

    <v-skeleton-loader v-if="isLoading" type="table" />

    <v-alert v-else-if="!userData || userData.length === 0" type="info" variant="tonal">
      Belum ada data user.
    </v-alert>

    <v-card v-else rounded="xl"
      class="px-2 py-2 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.15)] border hover:border-gray-400">
      <!-- <v-table striped="even">
        <thead>
          <tr>
            <th class="text-left">
              <p class="text-lg">
                User Code
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                User Name
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                Email
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                Role
              </p>
            </th>
            <th class="text-center">
              <p class="text-lg">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userData" :key="item.id">
            <td>{{ item.user_code }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>
            <td>
              <div class="flex justify-center gap-3">
                <v-btn prepend-icon="$edit" color="primary" rounded flat @click="openEditUserDialog(item)">
                  Edit
                </v-btn>
                <v-btn prepend-icon="$delete" color="red" rounded flat @click="openDeleteDialog(item)">
                  Delete
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table> -->

      <template v-slot:text>
        <div class="flex flex-row items-center gap-3"> <v-text-field v-model="search" label="Search"
            prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line rounded="xl"></v-text-field>
          <v-btn prepend-icon="mdi-plus" flat @click="openAddUserDialog" class="bg-black rounded-lg">
            Add User
          </v-btn>
        </div>

      </template>

      <v-data-table :headers="headers" :items="userData" :search="search">

        <template v-slot:item.actions="{ item }">
          <div class="flex justify-center gap-2">
            <v-btn icon="mdi-pencil" size="small" @click="openEditUserDialog(item)" title="Edit User"
              class="bg-black hover:bg-blue-500"></v-btn>
            <v-btn icon="mdi-delete" size="small" @click="openDeleteDialog(item)" title="Delete User"
              class="bg-black hover:bg-red-500"></v-btn>
          </div>
        </template></v-data-table>
    </v-card>
  </div>

  <ConfirmationDialog v-model="showDeleteDialog" :on-custom-click="handleDeleteUser"
    :message="'Apakah anda yakin ingin menghapus usser ini?'" />
  <AddUserDialog v-model="showAddUserDialog" :on-custom-click="handleAddUser" />
  <EditUserDialog v-model="showEditUserDialog" :on-custom-click="handleEditUser" :user="selectedUser" />
  <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
    :message="alertConfig.message" />
</template>



<style lang="scss" scoped></style>