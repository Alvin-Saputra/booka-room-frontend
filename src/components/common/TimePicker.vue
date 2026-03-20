<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },

});

const time = ref('11:15');
const emit = defineEmits(['submit-time', 'update:modelValue']);

const isDialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const handleSubmit = () => {
    emit('submit-time', time.value);
    isDialogVisible.value = false;
};

</script>

<template>
    <v-dialog v-model="isDialogVisible">
    <v-container>
        <v-row class="justify-space-around">
            <v-time-picker v-model="time" format="24hr" scrollable color="primary"></v-time-picker>
            <v-btn @click="handleSubmit">Submit</v-btn>
        </v-row>
    </v-container>
    </v-dialog>
</template>


<style lang="scss" scoped></style>