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

onMounted(async () => {
    await bookingStore.fetchBookingsByUserId();
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



</script>

<template>
    <div class="m-24">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
                <h1 class="text-3xl font-semibold">
                    Booking History
                </h1>
            </div>

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
                                Status
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

                            <v-chip :color="item.status === 'Approved' ? 'green' : 'red'">
                                {{ item.status }}
                            </v-chip>

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