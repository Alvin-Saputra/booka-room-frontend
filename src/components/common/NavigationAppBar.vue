<script setup>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Fungsi untuk logout user
const handleLogout = () => {
    // Panggil aksi logout dari store (pastikan fungsi ini ada di authStore Anda)
    authStore.logout();
    // Arahkan kembali ke halaman login
    router.push('/login');
};
</script>

<template>

    <v-app-bar color="white" scroll-behavior="elevate">
        <v-app-bar-title class="font-bold text-primary">
            BookaRoom
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <div class="hidden sm:flex gap-2 mr-4">
            <v-btn to="/user/room" variant="text" rounded>Cari Ruangan</v-btn>
            <v-btn to="/user/booking-history" variant="text" rounded>Booking Saya</v-btn>
        </div>

        <v-btn color="red" variant="tonal" rounded @click="handleLogout">
            Logout
        </v-btn>
    </v-app-bar>



</template>

<style scoped>
/* Anda bisa menambahkan styling khusus untuk layout ini di sini */
</style>