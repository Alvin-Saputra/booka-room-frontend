<template>
  <v-card class="p-4 rounded-xl shadow-sm" elevation="2">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Statistik Status Booking</h3>
    
    <apexchart 
      type="donut" 
      height="300" 
      :options="chartOptions" 
      :series="chartSeries"
    ></apexchart>
    
  </v-card>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
  chartData: {
    type: Object, // Gunakan huruf kapital 'O'
    required: true
  },
});

// Mengubah Objek menjadi Array sesuai urutan label: Approved, Pending, Rejected
const chartSeries = computed(() => {
  // Berikan nilai default 0 jika data belum ada
  if (!props.chartData) return [0, 0, 0]; 

  return [
    props.chartData.approved || 0,
    props.chartData.pending || 0,
    props.chartData.rejected || 0
  ];
});

const chartOptions = reactive({
  chart: { type: 'donut' },
  labels: ['Approved', 'Pending', 'Rejected'], // Urutan ini menjadi patokan kita di computed atas
  colors: ['#22c55e', '#f59e0b', '#ef4444'],
  dataLabels: { enabled: true },
  legend: { position: 'bottom' },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: { show: true },
          value: { show: true },
          total: {
            show: true,
            showAlways: true,
            label: 'Total Booking',
            color: '#374151',
          }
        }
      }
    }
  }
});
</script>