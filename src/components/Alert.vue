<script setup>
import { watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "Notification"
    },
    type: {
        type: String,
        default: "success"
    },
    message: {
        type: String,
        default: ""
    },
    timeout: {
        type: Number,
        default: 3000 // Waktu sebelum alert hilang (3 detik)
    }
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
    emit("update:modelValue", false);
};


watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            close();
        }, props.timeout);
    }
});
</script>

<template>
  <v-alert 
    v-if="modelValue"
    class="fixed top-5 right-5 z-50 min-w-[300px] shadow-lg transition-all"
    :title="title" 
    :type="type"  
    closable  
    @click:close="close"
  > 
    {{ message }}
    <slot />
  </v-alert>
</template>