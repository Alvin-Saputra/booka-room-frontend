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
import RoomDetailPanel from '@/components/common/RoomDetailPanel.vue';

const roomStore = useRoomStore();

const { roomData, isLoading, message } = storeToRefs(roomStore);

onMounted(async () => {
  // Panggil action dari store
  await roomStore.fetchRooms();
});

const showAddRoomDialog = ref(false);
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
  selectedRoom.facilities = room.facilities || [];
  selectedRoom.description = room.description || '';
  showEditRoomDialog.value = true
}

const openDetailRoomDialog = (room) => {
  selectedRoom.id = room.id;
  selectedRoom.roomName = room.room_name;
  selectedRoom.capacity = room.capacity;
  selectedRoom.description = room.description;
  selectedRoom.facilities = room.facilities;
  showDetailRoomDialog.value = true;
};



const handleAddRoom = async (roomName, capacity, description, facilities) => {
  const isSuccess = await roomStore.addRoom(roomName, capacity, description, facilities);
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

const handleEditRoom = async (roomName, capacity, description, facilities) => {
  const isSuccess = await roomStore.updateRoom(roomName, capacity, description, facilities, selectedRoom.id);
  if (isSuccess) {
    triggerAlert('success', 'Success', message);
    showEditRoomDialog.value = false;
    selectedRoom.id = null;
    selectedRoom.roomName = '';
    selectedRoom.capacity = '';
    selectedRoom.description = '';
    selectedRoom.facilities = [];
  }
  else {
    triggerAlert('error', 'Error', message);
    showEditRoomDialog.value = false;
    selectedRoom.id = null;
    selectedRoom.roomName = '';
    selectedRoom.capacity = '';
    selectedRoom.description = '';
    selectedRoom.facilities = [];
  }
};

</script>


<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div class="flex-col items-center gap-2">
        <h1 class="text-3xl font-bold text-gray-800">
          Manajemen Ruangan
        </h1>

        <p class="text-gray-500 mt-1">
          Atur Data Ruangan Anda
        </p>
      </div>
      <v-btn color="black" prepend-icon="mdi-plus" flat v-on:click="openAddRoomDialog" size="large"
        class="py-2 rounded-lg hover:bg-gray-700">
        Tambah Ruangan
      </v-btn>
    </div>

    <v-skeleton-loader v-if="isLoading" type="card, card, card" />

    <v-alert v-else-if="!roomData || roomData.length === 0" type="info" variant="tonal">
      Belum ada data room.
    </v-alert>

    <v-row v-else>
      <v-col v-for="item in roomData" :key="item.id" cols="12">
        <RoomCard :room="item" ">
          <template #actions>

            <div class=" flex flex-row gap-4">

          <v-btn color="black" variant="flat" size="large" @click="openEditRoomDialog(item)" prepend-icon="mdi-pencil"
            class="rounded-lg py-2 px-5 hover:bg-gray-700">
            Edit
          </v-btn>
          <v-btn color="black" variant="flat" size="large" @click="openDetailRoomDialog(item)"
            prepend-icon="mdi-information-box-outline" class="rounded-lg py-2 px-5 hover:bg-gray-700">
            Detail
          </v-btn>
          <v-btn variant="tonal" size="large" @click="openDeleteRoomDialog(item)" prepend-icon="mdi-delete"
            class="rounded-lg hover:bg-red-500 hover:text-white">
            Hapus
          </v-btn>
  </div>

</template>
</RoomCard>
</v-col>
</v-row>

<AddRoomDialog v-model="showAddRoomDialog" :on-custom-click="handleAddRoom" />

<EditRoomDialog v-model="showEditRoomDialog" :on-custom-click="handleEditRoom" :room="selectedRoom" />

<ConfirmationDialog v-model="showDeleteDialog" :on-custom-click="handleDeleteRoom"
  :message="'Apakah anda yakin ingin mengahpus data kamar ini?'" />

<RoomDetailPanel v-model="showDetailRoomDialog" :room="selectedRoom" />

<Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title" :message="alertConfig.message" />
</div>
</template>


<style lang="scss" scoped></style>