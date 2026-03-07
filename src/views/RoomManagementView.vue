<script setup>
import { onMounted } from 'vue';
import { useRoomStore } from '@/store/roomStore'; // Import store
import { storeToRefs } from 'pinia'

const roomStore = useRoomStore();

const { roomData, isLoading } = storeToRefs(roomStore);

onMounted(() => {
    // Panggil action dari store
    roomStore.fetchRooms();
});

</script>


<template>
  <div class="m-24">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-semibold">
          Room Management
        </h1>
      </div>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded
        flat
      >
        Add Room
      </v-btn>
    </div>

    <v-skeleton-loader
      v-if="isLoading"
      type="table"
    />

    <v-alert
      v-else-if="!roomData?.data || roomData.data.length === 0"
      type="info"
      variant="tonal"
    >
      Belum ada data room.
    </v-alert>

    <v-card
      v-else
      elevation="2px"
      rounded="xl"
      class="p-4"
    >
      <v-table striped="even">
        <thead>
          <tr>
            <th class="text-left">
              <p class="text-lg">
                User Code
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                User Name
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                Email
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                Role
              </p>
            </th>
            <th class="text-center">
              <p class="text-lg">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in roomData.data"
            :key="item.id"
          >
            <td>{{ item.room_name }}</td>
            <td>{{ item.room_code }}</td>
            <td>{{ item.capacity }}</td>
            <td>
              <div class="flex justify-center gap-3">
                <v-btn
                  prepend-icon="$edit"
                  color="primary"
                  rounded
                  flat
                >
                  Edit
                </v-btn>
                <v-btn
                  prepend-icon="$delete"
                  color="red"
                  rounded
                  flat
                >
                  Delete
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>


<style lang="scss" scoped></style>