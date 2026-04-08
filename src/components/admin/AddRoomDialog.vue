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
    }

});

const emit = defineEmits(['update:modelValue']);

const isDialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});



const facilities = ref(['']);

const roomName = ref(null);
const capacity = ref(null);
// const description = ref(null);

const handleSubmit = () => {
    props.onCustomClick(roomName.value, capacity.value);
    isDialogVisible.value = false;
};

const addFacility = () => {
    facilities.value.push('');
};

const removeFacility = (index) => {
    facilities.value.splice(index, 1);
};

watch(isDialogVisible, (newVal, oldVal) => {
    if (!newVal) {
        roomName.value = null;
        capacity.value = null;
        facilities.value = [''];
    }
});
</script>


<template>
    <v-dialog v-model="isDialogVisible" max-width="800" class="p-6">

        <v-card class="w-full max-w-3xl p-10 rounded-xl shadow-lg">

            <div class="mb-8 border-b">
                <div class="flex flex-row items-center gap-3">
                    <v-icon icon="mdi-pencil-outline" size="x-large"></v-icon>
                    <h2 class="text-2xl font-bold mb-6">

                        Form Tambah Ruangan

                    </h2>

                </div>
                <p class="text-gray-500">Silahkan Isi Form Berikut Untuk Menambahkan Ruangan</p>
            </div>


            <v-form @submit.prevent="handleSubmit">
                <v-text-field v-model="roomName" label="Room Name" variant="outlined" class="mb-2"
                    prepend-inner-icon="mdi-door" />

                <v-text-field v-model.number="capacity" label="Capacity" type="number" variant="outlined"
                    prepend-inner-icon="mdi-account-group" class="mb-2" />

                <v-textarea v-model="description" label="Description" type="text" variant="outlined" class="mb-4"
                    prepend-inner-icon="mdi mdi-card-text-outline" />

                <h3 class="text-lg font-semibold mb-2">Facilities</h3>
                <div v-for="(facility, index) in facilities" :key="index"
                    class="flex items-center gap-3 mb-3 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition">
                    <v-text-field v-model="facilities[index]" label="Facility Name" variant="outlined"
                        density="comfortable" hide-details class="flex-grow" />

                    <v-btn icon color="red" variant="text" @click="removeFacility(index)">
                        <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                </div>
                <div class="flex justify-center my-4">
                    <v-btn color="white" block @click="addFacility" elevation="0"
                        class="text-black px-5 py-5 border border-gray-200">
                        Add Facility
                    </v-btn>
                </div>


                <v-btn type="submit" color="black" size="x-large" block elevation="0"
                    class="mt-10 rounded-lg hover:bg-gray-700">
                    Submit
                </v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>


<style lang="scss" scoped></style>