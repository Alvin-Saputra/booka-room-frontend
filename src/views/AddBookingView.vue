<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoomStore } from '@/store/roomStore';
import { storeToRefs } from 'pinia';
import DatePicker from '@/components/DatePicker.vue';
import TimePicker from '@/components/TimePicker.vue';
import { useBookingStore } from '@/store/bookingStore';
import Alert from '@/components/Alert.vue';

const roomStore = useRoomStore();
const { roomData, isLoading} = storeToRefs(roomStore);

const bookingStore = useBookingStore();
const { message } = storeToRefs(bookingStore);

const selectedRoomId = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const purpose = ref(null);
const status = ref(null);

onMounted(() => {
    roomStore.fetchRooms();
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

const showStartDatePickerDialog = ref(false);
const showEndDatePickerDialog = ref(false);

const showStartTimePickerDialog = ref(false);
const showEndTimePickerDialog = ref(false);

const openStartDatePickerDialog = () => {
    showStartDatePickerDialog.value = true;
};
const openEndDatePickerDialog = () => {
    showEndDatePickerDialog.value = true;
};

const openStartTimePickerDialog = () => {
    showStartTimePickerDialog.value = true;
};
const openEndTimePickerDialog = () => {
    showEndTimePickerDialog.value = true;
};

const handleAddBooking = async () => {
    const isSuccess = await bookingStore.addBooking(selectedRoomId.value, startDate.value, endDate.value, startTime.value, endTime.value, purpose.value, status.value);

    if (isSuccess) {
        triggerAlert('success', 'Success', message);
        selectedRoomId.value = null;
        startDate.value = null;
        endDate.value = null;
        startTime.value = null;
        endTime.value = null;
        purpose.value = null;
        status.value = null;
    }
    else {
        triggerAlert('error', 'Error', message);
        selectedRoomId.value = null;
        startDate.value = null;
        endDate.value = null;
        startTime.value = null;
        endTime.value = null;
        purpose.value = null;
        status.value = null;
    }
};



</script>

<template>
    <div class="m-24">
        <v-card class="p-6 w-full" elevation="2" rounded="xl">
            <h2 class="text-xl font-semibold mb-4">Create Booking</h2>

            <v-form @submit.prevent="handleAddBooking">
                <v-row>
                    <v-col cols="12">
                        <v-select v-model="selectedRoomId" :items="roomData" item-title="room_name" item-value="id"
                            label="Pilih Ruangan" variant="outlined" :loading="isLoading"
                            placeholder="Cari atau pilih ruangan...">
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-bind="props" :title="item.room_name">
                                    <template v-slot:subtitle>
                                        <div class="flex items-center gap-1 mt-1 text-gray-600">
                                            <v-icon size="small" icon="mdi-account-group"></v-icon>
                                            <span>Kapasitas: {{ item.capacity }} Orang</span>
                                        </div>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="startDate" label="Start Date" variant="outlined" readonly
                            @click="openStartDatePickerDialog" />
                        <DatePicker v-model="showStartDatePickerDialog" @submit-date="(val) => startDate = val" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="startTime" label="Start Time" variant="outlined" readonly
                            @click="openStartTimePickerDialog" />
                        <TimePicker v-model="showStartTimePickerDialog" @submit-time="(val) => startTime = val" />
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="endDate" label="End Date" variant="outlined" readonly
                            @click="openEndDatePickerDialog" />
                        <DatePicker v-model="showEndDatePickerDialog" @submit-date="(val) => endDate = val" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="endTime" label="End Time" variant="outlined" readonly
                            @click="openEndTimePickerDialog" />
                        <TimePicker v-model="showEndTimePickerDialog" @submit-time="(val) => endTime = val" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-textarea v-model="purpose" clearable label="Purpose" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-combobox v-model="status" clearable label="Status"
                            :items="['Pending', 'Approved', 'Rejected']" variant="outlined" class="mb-6"></v-combobox>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-btn type="submit" color="primary" block>
                            Submit
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
            :message="alertConfig.message" />
    </div>
</template>


<style lang="scss" scoped></style>