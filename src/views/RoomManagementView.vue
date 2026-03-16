<script setup>
import { onMounted } from 'vue';
import { useRoomStore } from '@/store/roomStore'; // Import store
import { storeToRefs } from 'pinia'
import RoomCard from '@/components/RoomCard.vue';
import AddRoomDialog from '@/components/AddRoomDialog.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import Alert from '@/components/Alert.vue';
import { ref, reactive } from 'vue';
import EditRoomDialog from '@/components/EditRoomDialog.vue';


const roomStore = useRoomStore();

const { roomData, isLoading, message } = storeToRefs(roomStore);

onMounted(() => {
  // Panggil action dari store
  roomStore.fetchRooms();
});

const showAddRoomDialog = ref(false);
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


const openAddRoomDialog = () => {
  showAddRoomDialog.value = true;
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


const handleAddRoom = async (roomName, capacity) => {
  const isSuccess = await roomStore.addRoom(roomName, capacity);
  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showAddRoomDialog.value = false;  
  }
  else {
    triggerAlert('error', 'Error', message);
    showAddRoomDialog.value = false;
  }

};

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
  <div class="m-24">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-semibold">
          Room Management
        </h1>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded flat v-on:click="openAddRoomDialog">
        Add Room
      </v-btn>
    </div>

    <v-skeleton-loader v-if="isLoading" type="card, card, card" />

    <v-alert v-else-if="!roomData || roomData.length === 0" type="info" variant="tonal">
      Belum ada data room.
    </v-alert>

    <v-row v-else>
      <v-col v-for="item in roomData" :key="item.id" cols="12">
        <RoomCard :room="item" @request-delete="openDeleteRoomDialog" @request-update="openEditRoomDialog"/>
      </v-col>
    </v-row>
    <AddRoomDialog v-model="showAddRoomDialog" :on-custom-click="handleAddRoom" />
    <EditRoomDialog v-model="showEditRoomDialog" :on-custom-click="handleEditRoom" :room="selectedRoom" />
    <ConfirmationDialog v-model="showDeleteDialog" :on-custom-click="handleDeleteRoom"
      :message="'Apakah anda yakin ingin mengahpus data kamar ini?'" />
    <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
      :message="alertConfig.message" />
  </div>
</template>


<style lang="scss" scoped></style>