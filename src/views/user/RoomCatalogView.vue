<script setup>
import { onMounted } from 'vue';
import { useRoomStore } from '@/store/roomStore'; // Import store
import { storeToRefs } from 'pinia'
import RoomCard from '@/components/common/RoomCard.vue';
import AddRoomDialog from '@/components/admin/AddRoomDialog.vue';
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue';
import Alert from '@/components/common/Alert.vue';
import { ref, reactive } from 'vue';
import EditRoomDialog from '@/components/admin/EditRoomDialog.vue';


const roomStore = useRoomStore();

const { roomData, isLoading, message } = storeToRefs(roomStore);

onMounted(async () => {
  // Panggil action dari store
  await roomStore.fetchRooms();
});

const showDeleteDialog = ref(false);
const showEditRoomDialog = ref(false);

const selectedRoom = reactive({
  id: null,
  roomName: '',
  capacity: '',
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

const openEditRoomDialog = (room) => {
  selectedRoom.id = room.id;
  selectedRoom.roomName = room.room_name;
  selectedRoom.capacity = room.capacity;
  showEditRoomDialog.value = true
}


const handleDeleteRoom = async () => {
  const isSuccess = await roomStore.removeRoom(selectedRoom.id);
  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showDeleteDialog.value = false;
    selectedRoom.id = null;
  }
  else {
    triggerAlert('error', 'Error', message);
    showDeleteDialog.value = false;
    selectedRoom.id = null;
  }
};

const handleEditRoom = async (roomName, capacity) => {
  const isSuccess = await roomStore.updateRoom(roomName, capacity, selectedRoom.id);
  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showEditRoomDialog.value = false;
    selectedRoom.id = null;
    selectedRoom.roomName = '';
    selectedRoom.capacity = '';
  }
  else {
    triggerAlert('error', 'Error', message);
    showEditRoomDialog.value = false;
    selectedRoom.id = null;
    selectedRoom.roomName = '';
    selectedRoom.capacity = '';
  }
};

</script>


<template>
  <div>

    <div class="flex items-center justify-between mb-8">

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

    <v-row v-else>
      <v-col v-for="item in roomData" :key="item.id" cols="12" sm="6" lg="4">
        <RoomCard :room="item">
          <template #actions>
            <div class="flex items-center justify-end gap-3 w-full">

              <v-btn color="secondary" variant="text" class="font-semibold" @click="openDeleteRoomDialog(item)">
                Detail
              </v-btn>

              <v-btn color="primary" variant="flat" class="px-6 rounded-lg"
                :to="{ path: '/user/booking-room', query: { roomId: item.id } }">
                Booking
              </v-btn>

            </div>
          </template>
        </RoomCard>
      </v-col>
    </v-row>

    <AddRoomDialog v-model="showAddRoomDialog" :on-custom-click="handleAddRoom" />
  </div>
</template>


<style lang="scss" scoped></style>