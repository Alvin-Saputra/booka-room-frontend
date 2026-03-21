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
    <v-dialog v-model="isDialogVisible" max-width="360">

        <v-card class="rounded-xl">

            <v-card-text class="flex justify-center pt-6">
                <v-time-picker v-model="time" format="24hr" scrollable color="primary"></v-time-picker>
            </v-card-text>

            <v-card-actions class="px-6 pb-6 pt-0 justify-end">
                <v-btn color="gray" variant="text" @click="isDialogVisible = false">
                    Cancel
                </v-btn>
                <v-btn color="primary" variant="flat" class="px-4" @click="handleSubmit">
                    Confirm
                </v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>


<style lang="scss" scoped></style>