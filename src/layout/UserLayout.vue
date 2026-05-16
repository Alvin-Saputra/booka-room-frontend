<script setup>
import NavigationAppBar from "@/components/common/NavigationAppBar.vue";
import { useRouter } from "vue-router";

</script>

<template>
  <v-layout class="min-h-screen">
    <NavigationAppBar v-if="!$route.meta.hideLayout" />

    <v-main>
      <div class="p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>
