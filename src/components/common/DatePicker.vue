<script setup>
import { shallowRef } from 'vue'
import { defineEmits } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },

});

const value = shallowRef('2025-11-01');
const emit = defineEmits(['submit-date', 'update:modelValue']);

const isDialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});


const handleSubmit = () => {
  emit('submit-date', formatDate(value.value));
  isDialogVisible.value = false; // Menutup dialog
};

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

</script>

<template>
  <v-dialog v-model="isDialogVisible" max-width="600">


    <v-card class="rounded-xl">
      <v-date-picker v-model="value" color="primary" landscape landscape-header-width="250">
      </v-date-picker>

      <v-card-actions>
        <v-btn color="gray" variant="text" @click="isDialogVisible = false">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="handleSubmit">Confirm</v-btn>
      </v-card-actions>

    </v-card>


  </v-dialog>
</template>
