<script setup>
import { ref } from 'vue'
const drawer = ref(true);
const rail = ref(false);
import bookaRoomLogo from '@/assets/logo/booka-room-logo.png';

import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};

</script>


<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" width="350" permanent @click="rail = false"
    class="shadow-xl border-r border-gray-200" :class="!rail ? 'px-4' : ''">

    <!-- Profile -->
    <!-- <div
      class="p-4 flex items-center transition-all"
      :class="rail ? 'justify-center' : 'justify-between'"
    >

      <div class="flex items-center gap-3">

        <v-avatar size="40" :class="rail ? 'ml-2' : ''">
          <img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-avatar>

    
        <div
          class="flex flex-col transition-opacity duration-200"
          :class="rail ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'"
        >
          <span class="font-semibold text-gray-800 whitespace-nowrap">
            John Leider
          </span>

          <span class="text-xs text-gray-500 whitespace-nowrap">
            Administrator
          </span>
        </div>

      </div>

     
      <v-btn
        v-if="!rail"
        icon
        variant="text"
        size="small"
        @click.stop="rail = !rail"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

    </div> -->

    <div class="p-8  flex items-center transition-all" :class="rail ? 'justify-center' : 'justify-between'">

      <div class="flex items-center gap-3">


        <img height="60" :src="bookaRoomLogo" :class="rail ? 'ml-2' : ''" />


        <div class="flex flex-col transition-opacity duration-200"
          :class="rail ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'">
          <h3 class=" text-gray-800 whitespace-nowrap">
            Booka-Room
          </h3>


        </div>


      </div>

      <!-- Toggle -->
      <v-btn v-if="!rail" icon variant="text" size="small" @click.stop="rail = !rail">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

    </div>

    <v-divider />

    <!-- Menu -->
    <v-list nav density="comfortable" class="px-2 py-3">

      <v-list-item to="/admin/dashboard" class="rounded-xl mb-1  transition py-4" :class="!rail ? 'px-8' : ''"
        active-class="bg-black text-white transition selected-item">
        <template #prepend>
          <v-icon class="nav-icon text-gray-600">mdi mdi-tablet-dashboard</v-icon>
        </template>

        <v-list-item-title>
          <p class="font-semibold text-base m-0">Dashboard</p>
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/admin/user" class="rounded-xl mb-1  transition py-4" :class="!rail ? 'px-8' : ''"
        active-class="bg-black text-white transition selected-item">
        <template #prepend>
          <v-icon class="nav-icon text-gray-600">mdi-account-group-outline</v-icon>
        </template>

        <v-list-item-title>
          <p class="font-semibold text-base m-0">Users</p>
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/admin/room" class="rounded-xl transition py-4" :class="!rail ? 'px-8' : ''"
        active-class="bg-black text-white transition selected-item">
        <template #prepend>
          <v-icon class="nav-icon text-gray-600 ">mdi-sofa-outline</v-icon>
        </template>

        <v-list-item-title>
          <p class=" font-semibold text-base m-0">Room</p>
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/admin/booking" class="rounded-xl  transition py-4" :class="!rail ? 'px-8' : ''"
        active-class="bg-black text-white transition selected-item">
        <template #prepend>
          <v-icon class="nav-icon text-gray-600">mdi mdi-book-plus-multiple-outline</v-icon>
        </template>

        <v-list-item-title>
          <p class=" font-semibold text-base m-0">Booking</p>
        </v-list-item-title>
      </v-list-item>

    </v-list>

    <template v-slot:append>
      <div class="pa-2 mb-8">
        <v-btn block v-show="!rail" @click="handleLogout" rounded="xl" variant="text" size="x-large"
          class="flex justify-start px-8 hover:bg-red-200 ">
          <v-icon>mdi-logout</v-icon>
          <p class="text-black px-8 ">Logout</p>
        </v-btn>
      </div>
    </template>

  </v-navigation-drawer>
</template>



<style scoped>
:deep(.selected-item) .nav-icon {
  color: white !important;
}
</style>
