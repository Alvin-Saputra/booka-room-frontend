<script setup>
import { useBookingStore } from '@/store/bookingStore';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import Alert from '@/components/Alert.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const bookingStore = useBookingStore();
const { bookingData, isLoading, message } = storeToRefs(bookingStore);

const showConfirmationDialog = ref(false);
const selectedId = ref(null);
const confirmationAction = ref(null);
const confirmationMessage = ref(null);

onMounted(() => {
  bookingStore.fetchBookings();
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

</script>

<template>
  <div class="m-24">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-semibold">
          Booking Management
        </h1>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded flat to="/add-booking">
        Create Booking
      </v-btn>
    </div>

    <v-skeleton-loader v-if="isLoading" type="table" />

    <v-alert v-else-if="!bookingData || bookingData.length === 0" type="info" variant="tonal">
      Belum ada data booking.
    </v-alert>

    <v-card v-else elevation="2px" rounded="xl" class="p-4">
      <v-table striped="even">
        <thead>
          <tr>
            <th class="text-left">
              <p class="text-lg">
                User Name
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                Room Name
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                Start Time
              </p>
            </th>
            <th class="text-left">
              <p class="text-lg">
                End Time
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
          <tr v-for="item in bookingData" :key="item.id">
            <td>{{ item.user_name }}</td>
            <td>{{ item.room_name }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.end_time }}</td>
            <td>
              <div v-if="item.status !== 'Approved' && item.status !== 'Rejected'" class="flex justify-center gap-3">

                <v-btn prepend-icon="$delete" color="red" rounded flat
                  @click="openConfirmationDialog(item.id, handleDeleteBooking, 'Apakah anda yakin ingin menghapus booking ini?')">
                  Delete
                </v-btn>
                <v-btn prepend-icon="mdi-check" color="green" rounded flat
                  @click="openConfirmationDialog(item.id, () => handleBookingApproval('Approved'), 'Apakah anda yakin ingin mengkonfirmasi booking ini?')">
                  Approve
                </v-btn>
                <v-btn prepend-icon="mdi-close" color="red" rounded flat
                  @click="openConfirmationDialog(item.id, () => handleBookingApproval('Rejected'), 'Apakah anda yakin ingin menolak booking ini?')">
                  Reject
                </v-btn>
              </div>

              <div v-else>
                <v-chip :color="item.status === 'Approved' ? 'green' : 'red'">
                  {{ item.status }}
                </v-chip>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>

  <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
    :message="alertConfig.message" />

  <ConfirmationDialog v-model=showConfirmationDialog :on-custom-click="confirmationAction"
    :message=confirmationMessage />

</template>



<style lang="scss" scoped></style>