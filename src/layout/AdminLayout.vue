<script setup>
// Pastikan path impor disesuaikan dengan struktur folder baru Anda
import NavigationDrawer from '@/components/common/NavigationDrawer.vue';
</script>

<template>
  <v-layout>
    <NavigationDrawer />

    <v-main class="bg-gray-50 min-h-screen">
      <div class="p-8">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>