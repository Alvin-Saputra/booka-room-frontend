<script setup>

import { ref } from 'vue';

const props = defineProps({
    booking: {
        type: Object,
        required: true
    }
})
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


const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);

    // Output contoh: 01 Nov 2025, 11:15
    return date.toLocaleString('id-ID'); // Mengubah format jam 11.15 menjadi 11:15 (opsional)
};
</script>

<template>
    <v-card
        class="flex flex-col md:flex-row items-start md:items-center justify-start mb-4 p-4 gap-4 md:gap-8 rounded-lg border shadow-xl  transition-shadow">

        <div class="flex-shrink-0 w-full md:w-[200px]">
            <v-img height="175px" class="w-full rounded-lg"
                src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                cover></v-img>
        </div>


        <div class="flex flex-col md:flex-row gap-6 md:gap-12">
            <div class="flex flex-col gap-1">
                <h2 class="m-0">{{ props.room_name }}</h2>
                <p class="m-0 text-gray-500 text-sm"> <v-icon>mdi-account</v-icon> {{ item.user_name }}</p>

            </div>

            <div class="flex items-center gap-4  md:px-4">
                <div class="flex flex-col gap-1">
                    <p class="m-0 text-gray-400 text-sm flex items-center">
                        Mulai
                    </p>
                    <h4 class="m-0 font-medium text-gray-500"> <v-icon class="text-gray-600">mdi-clock-start</v-icon> 
                    {{ formatDateTime(props.start_time) }}
                    </h4>

                </div>

                <v-icon class="text-gray-500">mdi-arrow-right</v-icon>

                <div class="flex flex-col gap-1">
                    <p class="m-0 text-gray-400 text-sm flex items-center">
                        Selesai
                    </p>
                    <h4 class="m-0 font-medium text-gray-500"> <v-icon class="text-gray-600">mdi-clock-end</v-icon>
                        {{ formatDateTime(props.end_time) }}</h4>

                </div>
            </div>




        </div>

        <div class="flex justify-center flex-1 mt-2 md:mt-0">
            <v-chip :class="getStatusBgClass(item.status)" variant="tonal" class="font-medium px-4 text-white">
                {{ item.status }}
            </v-chip>
        </div>

    </v-card>
</template>



<style lang="scss" scoped></style>