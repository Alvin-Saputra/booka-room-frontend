<script setup>
import { onMounted } from 'vue';
import { useRoomStore } from '@/store/roomStore'; // Import store
import { storeToRefs } from 'pinia'
import RoomCard from '@/components/common/RoomCard.vue';
import AddRoomDialog from '@/components/admin/AddRoomDialog.vue';
import Alert from '@/components/common/Alert.vue';
import { ref, reactive } from 'vue';
import RoomDetailPanel from '@/components/user/RoomDetailPanel.vue';
import RoomCardCatalog from '@/components/user/RoomCardCatalog.vue';


const roomStore = useRoomStore();

const { roomData, isLoading, message } = storeToRefs(roomStore);

onMounted(async () => {
  // Panggil action dari store
  await roomStore.fetchRooms();
});

const showDeleteDialog = ref(false);
const showEditRoomDialog = ref(false);
const showDetailRoomDialog = ref(false);

const selectedRoom = reactive({
  id: null,
  roomName: '',
  capacity: '',
  description: '',
  facilities: []
});


const alertConfig = reactive({
  show: false,
  type: 'success',
  title: 'Success',
  message: ''
});

const triggerAlert = (type, title, msg) => {
  alertConfig.type = type;
  alertConfig.title = title;
  alertConfig.message = msg;
  alertConfig.show = true;
};



const openDeleteRoomDialog = (room) => {
  selectedRoom.id = room.id;
  showDeleteDialog.value = true;
};

const openDetailRoomDialog = (room) => {
  selectedRoom.id = room.id;
  selectedRoom.roomName = room.room_name;
  selectedRoom.capacity = room.capacity;
  selectedRoom.description = room.description;
  selectedRoom.facilities = room.facilities;
  showDetailRoomDialog.value = true;
};




</script>


<template>
  <div class="max-w-7xl mx-auto">

    <div class="flex items-center justify-between mb-8 bg">

      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Katalog Ruangan
        </h1>
        <p class="text-gray-500 mt-1">
          Temukan dan pesan ruangan untuk meeting Anda.
        </p>
      </div>

    </div>

    <div v-if="isLoading" class="my-12">
      <v-skeleton-loader type="card, card, card" />
    </div>

    <v-alert v-else-if="!roomData || roomData.length === 0" type="info" variant="tonal" class="my-12">
      Belum ada data ruangan yang tersedia.
    </v-alert>

    <v-row v-else dense>
      <v-col v-for="item in roomData" :key="item.id" cols="12" sm="6" md="4" class="px-1 py-1">

        <RoomCardCatalog :room="item">
          <template #actions>
            <div class="flex items-center gap-3 w-full">
              <v-btn @click="openDetailRoomDialog(item)">Detail</v-btn>
              <v-btn class="flex-1 text-white rounded-lg hover:bg-gray-500 " color="black" variant="flat"
                :to="{ path: '/user/booking-room', query: { roomId: item.id } }">
                Booking
              </v-btn>
            </div>
          </template>
        </RoomCardCatalog>
      </v-col>
    </v-row>

    <AddRoomDialog v-model="showAddRoomDialog" :on-custom-click="handleAddRoom" />
    <RoomDetailPanel v-model="showDetailRoomDialog" :room="selectedRoom" />

  </div>
</template>


<style lang="scss" scoped></style>