<script setup>

const props = defineProps({
  room: {
    type: Object,
    required: true
  },



});

</script>

<template>
  <v-card class="px-2 py-2 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.15)] border hover:border-gray-400" max-width="450" elevation="0">
    <v-img height="300px"
      :src="props.room.image_url || 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
      cover class="rounded-lg"></v-img>

    <h2 class="title m-4">
      {{ props.room.room_name }}
    </h2>

    <v-card-subtitle>
     {{ props.room.description }}
    </v-card-subtitle>

    <div class="flex mx-4">
      <div class="flex items-center">
        <v-icon icon="mdi-account-group" color="#f0f0f0" class="mr-4"></v-icon>
        <p class="text-sm text-gray-500">Kapasitas: {{ props.room.capacity }}</p>
      </div>


    </div>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>


  </v-card>
</template>

<style scoped>
.title {
  font-weight: 550;
}
</style>