<script setup>
import { ref } from 'vue'
const drawer = ref(true)
const rail = ref(false)
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
      >
        <template #append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account" />
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" />
    </v-list>
  </v-navigation-drawer>
</template>