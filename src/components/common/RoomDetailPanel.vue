<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  room: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isDrawerOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const navigateToBooking = (roomId) => {
  if (authStore.user?.role === "admin") {
    router.push({
      name: "admin-add-booking",
      query: { roomId: roomId },
    });
    return;
  } else {
    router.push({
      name: "user-booking-room",
      query: { roomId: roomId },
    });
  }
};
</script>

<template>
  <v-dialog
    v-model="isDrawerOpen"
    fullscreen
    transition="slide-x-reverse-transition"
  >
    <div class="flex justify-end h-full" @click.self="isDrawerOpen = false">
      <v-card
        width="600"
        class="h-full overflow-y-auto rounded-none sm:rounded-l-lg bg-white p-2"
      >
        <v-img
          :src="
            props.room.imageUrl ||
            'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          "
          height="400"
          cover
          class="rounded-lg"
        ></v-img>

        <div class="p-5">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ props.room.roomName }}
          </h2>
          <p class="text-gray-500 mt-1">{{ props.room.description }}</p>
          <p class="text-gray-500 mt-1">Kapasitas {{ props.room.capacity }}</p>

          <div class="mt-6">
            <h3 class="font-semibold text-gray-700 mb-2">Fasilitas Utama:</h3>
            <ul
              v-for="facility in props.room.facilities"
              :key="facility"
              class="list-disc pl-5 space-y-1 text-sm text-gray-600"
            >
              <li>{{ facility }}</li>
            </ul>
          </div>

          <div class="mt-8 flex flex-col gap-3">
            <v-btn
              color="black"
              block
              size="x-large"
              class="rounded-lg"
              @click="navigateToBooking(props.room.id)"
              >Pesan Ruangan Ini</v-btn
            >
            <v-btn
              variant="tonal"
              size="large"
              block
              @click="isDrawerOpen = false"
              >Tutup</v-btn
            >
          </div>
        </div>
      </v-card>
    </div>
  </v-dialog>
</template>

<style scoped>
/* Tidak perlu tambahan CSS khusus, Vuetify dan Tailwind akan menanganinya */
</style>
