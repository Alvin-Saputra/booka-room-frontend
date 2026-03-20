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
    emit('submit-date', value.value);
    isDialogVisible.value = false; // Menutup dialog
};

</script>

<template>
  <v-dialog v-model="isDialogVisible">
    <v-layout>
      <v-container>
        <div class="d-flex flex-wrap justify-space-around ga-6 bg-white p-4 rounded-xl">
          <v-date-picker v-model="value" color="primary" landscape landscape-header-width="250">
          </v-date-picker>
          
          <v-btn color="primary" @click="handleSubmit">Submit</v-btn>
        </div>
      </v-container>
    </v-layout>
  </v-dialog>
</template>
