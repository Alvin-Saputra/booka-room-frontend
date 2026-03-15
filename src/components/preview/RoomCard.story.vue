<script setup>
import RoomCard from '../RoomCard.vue';
</script>

<template>
  <Story title="Room Card Component">
    
    <Variant title="Kapasitas Kecil (Default)">
      <RoomCard :room="{ name: 'Ruang Meeting A', code: 'R001', capacity: 10 }" />
    </Variant>

    <Variant title="Kapasitas Besar">
      <RoomCard :room="{ name: 'Ruang Seminar Utama', code: 'R002', capacity: 100 }" />
    </Variant>

    <Variant title="Ruang VIP">
      <RoomCard :room="{ name: 'Ruang Direksi', code: 'VIP-01', capacity: 5 }" />
    </Variant>

  </Story>
</template>