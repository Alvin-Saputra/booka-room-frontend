<script setup>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import bookaRoomLogo from '@/assets/logo/booka-room-logo.png';


const authStore = useAuthStore();

const userName = authStore.user?.user_name

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
    <v-btn to="/user/room" variant="text" rounded class="nav-btn">
        Cari Ruangan
    </v-btn>
    <v-btn to="/user/booking-history" variant="text" rounded class="nav-btn">
        Booking Saya
    </v-btn>
</div>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-menu>
            <template #activator="{ props }">

                <div v-bind="props" class="flex items-center gap-2">
                    <v-avatar size="40">
                        <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                    </v-avatar>

                    <p class="font-medium">{{ userName }}</p>

                    <v-icon>mdi-chevron-down</v-icon>
                </div>


            </template>
            <v-list class="rounded-lg">
                <v-list-item to="/user/profile" class="bg-blue-50 mx-4 my-2 rounded-lg">
                    <template #prepend>
                        <v-icon>mdi-account</v-icon>
                    </template>
                    <v-list-item-title> Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleLogout" class="bg-red-50 mx-4 my-2 rounded-lg">
                    <template #prepend>
                        <v-icon>mdi-logout</v-icon>
                    </template>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>
</template>

<style scoped>

.nav-btn.v-btn--active {
    background-color: #1e1e1e !important; 
    color: #fafafa !important;
    font-weight: bold;
}



</style>