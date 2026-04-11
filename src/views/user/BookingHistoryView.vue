<script setup>
import { useBookingStore } from '@/store/bookingStore';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import Alert from '@/components/common/Alert.vue';
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue';
import BookingHistoryCard from '@/components/user/BookingHistoryCard.vue';

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
    <div class="max-w-7xl mx-12 md:mx-auto">
        <div class="flex items-center justify-between mb-6">
            <div class="flex-col items-center gap-2">
                <h1 class="text-3xl font-bold text-gray-800">
                    Riwayat Pemesanan
                </h1>

                <p class="text-gray-500 mt-1">
                    Lihat riwayat pemesanan ruangan yang telah Anda buat
                </p>
            </div>

        </div>

        <v-skeleton-loader v-if="isLoading" type="table" />

        <v-alert v-else-if="!bookingData || bookingData.length === 0" type="info" variant="tonal">
            Belum ada data booking.
        </v-alert>

        <div v-for="item in bookingData" :key="item.id" class="mb-4 flex flex-col">
           <BookingHistoryCard :booking="item"></BookingHistoryCard>
        </div>


    </div>

    <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
        :message="alertConfig.message" />

    <ConfirmationDialog v-model=showConfirmationDialog :on-custom-click="confirmationAction"
        :message=confirmationMessage />

</template>



<style lang="scss" scoped></style>