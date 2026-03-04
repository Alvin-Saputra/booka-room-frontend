<!-- <script setup>
import { getUsers } from '@/service/user-service';
import { ref } from 'vue';
import { onMounted } from 'vue';

const userData = ref([]);
const fetchUsers = async () => {
    try {
        const users = await getUsers();
        userData.value = users;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

onMounted(() => {
    fetchUsers();
});

</script> -->


<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/userStore'; // Import store
import { storeToRefs } from 'pinia'; // Untuk menjaga reaktivitas saat melakukan destructuring

// Inisialisasi store
const userStore = useUserStore();

// Destructure state agar lebih mudah dipanggil di template
const { userData, isLoading } = storeToRefs(userStore);

onMounted(() => {
    // Panggil action dari store
    userStore.fetchUsers();
});

</script>

<template>
    <div class="m-24">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
                <h1 class="text-3xl font-semibold">User Management</h1>
            </div>
            <v-btn color="primary" prepend-icon="mdi-plus" rounded flat>
                Add User
            </v-btn>
        </div>

        <v-skeleton-loader v-if="isLoading" type="table" />
        
        <v-alert v-else-if="!userData?.data || userData.data.length === 0" type="info" variant="tonal">
            Belum ada data user.
        </v-alert>
        
        <v-card v-else elevation="2px" rounded="xl" class="p-4"> 
            <v-table striped="even">
                <thead>
                    <tr>
                        <th class="text-left"><p class="text-lg">User Code</p></th>
                        <th class="text-left"><p class="text-lg">User Name</p></th>
                        <th class="text-left"><p class="text-lg">Email</p></th>
                        <th class="text-left"><p class="text-lg">Role</p></th>
                        <th class="text-center"><p class="text-lg">Actions</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in userData.data" :key="item.id">
                        <td>{{ item.user_name }}</td>
                        <td>{{ item.user_code }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.role }}</td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <v-btn prepend-icon="$edit" color="primary" rounded flat >Edit</v-btn>
                                <v-btn prepend-icon="$delete" color="red" rounded flat>Delete</v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </div>
</template>



<style lang="scss" scoped></style>