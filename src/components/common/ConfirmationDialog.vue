<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  onCustomClick: {
    type: Function,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// Sinkron dengan parent (v-model)
const isDialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Ketika user konfirmasi
const handleConfirm = () => {
  props.onCustomClick();   // jalankan callback
  isDialogVisible.value = false; // tutup dialog
};
</script>

<template>
  
  <v-dialog v-model="isDialogVisible" max-width="400" class="p-16">
    <v-card class="p-4">
      <v-card-title class="text-h6">
        Konfirmasi Hapus
      </v-card-title>

      <v-card-text>
        {{ props.message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="grey-darken-1" variant="text" @click="isDialogVisible = false">
          Cancel
        </v-btn>

        <v-btn color="red" variant="flat" @click="handleConfirm">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>