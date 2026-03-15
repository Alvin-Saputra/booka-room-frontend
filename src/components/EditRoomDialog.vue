<script setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  onCustomClick: {
    type: Function,
    required: true
  },
  room: {
    type: Object,
    required: true
  }

});



const emit = defineEmits(['update:modelValue']);

const isDialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});


const roomName = ref(null);
const capacity = ref(null);

const handleSubmit = () => {
  props.onCustomClick(roomName.value, capacity.value);
  isDialogVisible.value = false;
};

watch(
  () => props.room,
  (newRoom) => {
    if (!newRoom) return;
    roomName.value = newRoom.roomName;
    capacity.value = newRoom.capacity;
  },
  { immediate: true, deep: true }
);



</script>


<template>
  <v-dialog v-model="isDialogVisible" max-width="400" class="p-6">
    <v-card class="w-full max-w-2xl p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Edit Room
      </h2>

      <v-form @submit.prevent="handleSubmit">
        <v-text-field v-model="roomName" label="Room Name" variant="outlined" class="mb-4" />

        <v-text-field v-model.number="capacity" label="Capacity" type="number" variant="outlined" class="mb-4" />


        <v-btn type="submit" color="primary" block>
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>


<style lang="scss" scoped></style>