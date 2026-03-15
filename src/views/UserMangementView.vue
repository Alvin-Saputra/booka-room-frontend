<script setup>
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import AddUserDialog from '../components/AddUserDialog.vue';
import EditUserDialog from '../components/EditUserDialog.vue';
import Alert from '@/components/Alert.vue';


const userStore = useUserStore();
const { userData, isLoading, message } = storeToRefs(userStore);

onMounted(() => {
  userStore.fetchUsers();
});

const showDeleteDialog = ref(false);
const showAddUserDialog = ref(false);
const showEditUserDialog = ref(false);
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

</script>

<template>
  <div class="m-24">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-semibold">
          User Management
        </h1>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded flat @click="openAddUserDialog">
        Add User
      </v-btn>
    </div>

    <v-skeleton-loader v-if="isLoading" type="table" />

    <v-alert v-else-if="!userData || userData.length === 0" type="info" variant="tonal">
      Belum ada data user.
    </v-alert>

    <v-card v-else elevation="2px" rounded="xl" class="p-4">
      <v-table striped="even">
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
      </v-table>
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