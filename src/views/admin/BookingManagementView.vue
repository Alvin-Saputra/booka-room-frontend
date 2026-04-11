<script setup>
import { useBookingStore } from '@/store/bookingStore';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import Alert from '@/components/common/Alert.vue';
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue';

const bookingStore = useBookingStore();
const { bookingData, isLoading, message } = storeToRefs(bookingStore);

const showConfirmationDialog = ref(false);
const selectedId = ref(null);
const confirmationAction = ref(null);
const confirmationMessage = ref(null);
const search = ref('');

onMounted(async () => {
  await bookingStore.fetchBookings();
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

const handleDeleteBooking = async () => {

  const isSuccess = await bookingStore.removeBooking(selectedId.value);

  if (isSuccess) {
    triggerAlert('success', 'Success', message);
  }
  else {
    triggerAlert('error', 'Error', message);

  }
  selectedId.value = null;
};

const handleBookingApproval = async (status) => {
  const isSuccess = await bookingStore.approvalBooking(selectedId.value, status);

  if (isSuccess) {
    triggerAlert('success', 'Success', message);
  }
  else {
    triggerAlert('error', 'Error', message);

  }
  selectedId.value = null;
}


const openConfirmationDialog = (id, callback, message) => {
  selectedId.value = id;
  confirmationAction.value = callback;
  showConfirmationDialog.value = true;
  confirmationMessage.value = message;
};

const headers = [
  { title: 'Room Name', align: 'start', key: 'room_name' },
  { title: 'User Name', align: 'start', key: 'user_name' },
  { title: 'Start Time', align: 'start', key: 'start_time' },
  { title: 'End Time', align: 'start', key: 'end_time' },
  { title: 'Purpose', align: 'start', key: 'purpose' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Actions', align: 'center', key: 'actions', sortable: false }
];

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);


  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace('.', ':');
};

const getStatusBgClass = (status) => {
  if (!status) return 'bg-gray-500';

  // Gunakan toLowerCase() agar aman dari perbedaan huruf kapital di database
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-500';
    case 'rejected':
      return 'bg-red-500';
    case 'pending':
      return 'bg-orange-400';
    default:
      return 'bg-gray-500';
  }
};


</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div class="flex-col items-center gap-2">
        <h1 class="text-3xl font-bold text-gray-800">
          Manajemen Booking
        </h1>

        <p class="text-gray-500 mt-1">
          Atur Booking Ruangan Anda
        </p>
      </div>
    
    </div>

    <v-skeleton-loader v-if="isLoading" type="table" />

    <v-alert v-else-if="!bookingData || bookingData.length === 0" type="info" variant="tonal">
      Belum ada data booking.
    </v-alert>

    <v-card v-else elevation="2px" rounded="xl"
      class="px-2 py-2 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.15)] border hover:border-gray-400">

      <template v-slot:text>
        <div class="flex flex-row items-center gap-3"> <v-text-field v-model="search" label="Search"
            prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line rounded="xl"></v-text-field>
            <v-btn prepend-icon="mdi-plus" flat class="bg-black rounded-lg" to="/admin/add-booking">
            Buat Booking
          </v-btn>
        </div>

      </template>

      <v-data-table :headers="headers" :items="bookingData" :search="search">

        <template v-slot:item.start_time="{ item }">
          {{ formatDateTime(item.start_time) }}
        </template>
        <template v-slot:item.end_time="{ item }">
          {{ formatDateTime(item.end_time) }}
        </template>
        <template v-slot:item.status="{ item }">

          <v-chip :class="getStatusBgClass(item.status)" variant="tonal" class="font-medium px-4 text-white">
            {{ item.status }}
          </v-chip>


        </template>

        <template v-slot:item.actions="{ item }">


          <div class="flex justify-center gap-2">
            <v-btn icon="mdi-delete" size="small" class="bg-black hover:bg-red-500"
              @click="openConfirmationDialog(item.id, handleDeleteBooking, 'Apakah anda yakin ingin menghapus booking ini?')">
            </v-btn>
            <v-btn icon="mdi-check" size="small" class="bg-black hover:bg-green-500"
               @click="openConfirmationDialog(item.id, () => handleBookingApproval('Approved'), 'Apakah anda yakin ingin mengkonfirmasi booking ini?')">
            </v-btn>
            <v-btn icon="mdi-close" size="small" class="bg-black hover:bg-red-500"
               @click="openConfirmationDialog(item.id, () => handleBookingApproval('Rejected'), 'Apakah anda yakin ingin menolak booking ini?')">
            </v-btn>
          </div>
        
        </template></v-data-table>
    </v-card>
  </div>

  <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
    :message="alertConfig.message" />

  <ConfirmationDialog v-model=showConfirmationDialog :on-custom-click="confirmationAction"
    :message=confirmationMessage />

</template>



<style lang="scss" scoped></style>