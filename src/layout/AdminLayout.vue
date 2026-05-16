<script setup>
// Pastikan path impor disesuaikan dengan struktur folder baru Anda
import NavigationDrawer from '@/components/common/NavigationDrawer.vue';
import { useRouter } from 'vue-router';


</script>

<template>
  <v-layout class="h-screen overflow-hidden">
    <NavigationDrawer v-if="!$route.meta.hideLayout" />

    <v-main class="bg-gray-50 h-screen overflow-y-auto">
      <div class="p-8">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>