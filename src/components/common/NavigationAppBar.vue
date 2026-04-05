<script setup>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import bookaRoomLogo from '@/assets/logo/booka-room-logo.png';


const authStore = useAuthStore();
const router = useRouter();

// Fungsi untuk logout user
const handleLogout = () => {

    authStore.logout();

    router.push('/login');
};
</script>

<template>
    <v-app-bar color="white" scroll-behavior="elevate" class="px-8 py-4">
        
        <v-app-bar-nav-icon>
            <v-img :src="bookaRoomLogo" height="48" width="48"></v-img>
        </v-app-bar-nav-icon>
        <v-app-bar-title class="font-bold text-black">
            Booka Room
        </v-app-bar-title>

        <v-spacer></v-spacer>
        

        <div class="hidden sm:flex gap-2">
            <v-btn to="/user/room" variant="text" rounded>Cari Ruangan</v-btn>
            <v-btn to="/user/booking-history" variant="text" rounded>Booking Saya</v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-btn color="red" variant="tonal" rounded @click="handleLogout" class="mr-2">
            Logout
        </v-btn>
        
    </v-app-bar>
</template>

<style scoped>
/* Anda bisa menambahkan styling khusus untuk layout ini di sini */
</style>