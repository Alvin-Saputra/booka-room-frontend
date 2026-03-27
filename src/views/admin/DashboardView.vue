<script setup>
import BookingStatusChart from '@/components/admin/BookingStatusChart.vue';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { useBookingStore } from '@/store/bookingStore';
import { storeToRefs } from 'pinia';

const bookingStore = useBookingStore();
const { bookingDataStatistic, isLoading, message } = storeToRefs(bookingStore);

onMounted(async () => {
  await bookingStore.fetchBookingsStatistic();
});


</script>

<template>
  <v-container>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
      <p class="text-gray-500">Selamat datang, berikut adalah ringkasan sistem Booka Room.</p>
    </div>

    <v-row>
     <v-col cols="12" md="5" lg="4">
        
        <BookingStatusChart 
          v-if="bookingDataStatistic" 
          :chart-data="bookingDataStatistic.status_count" 
        />
        
        <v-skeleton-loader v-else type="card" height="300" class="rounded-xl" />

      </v-col>
      
      <v-col cols="12" md="7" lg="8">
        <v-card class="p-4 rounded-xl shadow-sm flex items-center justify-center h-full min-h-[300px]" elevation="2">
          <p class="text-gray-400">Tempat untuk Grafik Ruangan Terpopuler nanti</p>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

