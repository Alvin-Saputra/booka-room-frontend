<script setup>
import { ref } from 'vue'
const drawer = ref(true);
const rail = ref(false);

import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};

</script>


<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    width="260"
    permanent
    @click="rail = false"
    class="shadow-xl border-r border-gray-200"
  >

    <!-- Profile -->
    <div
      class="p-4 flex items-center transition-all"
      :class="rail ? 'justify-center' : 'justify-between'"
    >

      <div class="flex items-center gap-3">

        <v-avatar size="40">
          <img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-avatar>

        <!-- Text -->
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

      <!-- Toggle -->
      <v-btn
        v-if="!rail"
        icon
        variant="text"
        size="small"
        @click.stop="rail = !rail"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

    </div>

    <v-divider />

    <!-- Menu -->
    <v-list nav density="comfortable" class="px-2 py-3">

      <v-list-item
        to="/admin/dashboard"
        class="rounded-xl mb-1 hover:bg-gray-100 transition"
      >
        <template #prepend>
          <v-icon class="text-gray-600">mdi mdi-tablet-dashboard</v-icon>
        </template>

        <v-list-item-title class="font-medium">
          Dashbord
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        to="/admin/user"
        class="rounded-xl mb-1 hover:bg-gray-100 transition"
      >
        <template #prepend>
          <v-icon class="text-gray-600">mdi-account-group-outline</v-icon>
        </template>

        <v-list-item-title class="font-medium">
          Users
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        to="/admin/room"
        class="rounded-xl hover:bg-gray-100 transition"
      >
        <template #prepend>
          <v-icon class="text-gray-600">mdi-sofa-outline</v-icon>
        </template>

        <v-list-item-title class="font-medium">
          Room
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        to="/admin/booking"
        class="rounded-xl hover:bg-gray-100 transition"
      >
        <template #prepend>
          <v-icon class="text-gray-600">mdi mdi-book-plus-multiple-outline</v-icon>
        </template>

        <v-list-item-title class="font-medium">
          Booking
        </v-list-item-title>
      </v-list-item>

    </v-list>

       <template v-slot:append>
          <div class="pa-2">
            <v-btn block v-show="!rail" @click="handleLogout" rounded="xl" class="bg-red-500" >
              <p class="text-white">Logout</p>
            </v-btn>
          </div>
        </template>

  </v-navigation-drawer>
</template>