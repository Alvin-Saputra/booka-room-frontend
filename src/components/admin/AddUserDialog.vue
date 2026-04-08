<script setup>
import { computed } from 'vue';
import { ref } from 'vue';

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
const name = ref(null);
const email = ref(null);
const role = ref(null);

const handleSubmit = () => {
  props.onCustomClick(name.value, email.value, role.value);
  isDialogVisible.value = false;
};

</script>


<template>
  <v-dialog v-model="isDialogVisible" max-width="800" class="p-6">
    <v-card class="w-full max-w-3xl p-10 rounded-xl shadow-lg">
      <div class="mb-8 border-b">
        <div class="flex flex-row items-center gap-3">
          <v-icon icon="mdi-pencil-outline" size="x-large"></v-icon>
          <h2 class="text-2xl font-bold mb-6">

            Form Tambah Pengguna

          </h2>

        </div>
        <p class="text-gray-500">Silahkan Isi Form Berikut Untuk Menambahkan Pengguna</p>
      </div>

      <v-form @submit.prevent="handleSubmit">

        <div class="mb-4">

          <v-text-field v-model="name" label="Name" variant="outlined" />

          <v-text-field v-model="email" label="Email" type="email" variant="outlined" />

          <v-combobox v-model="role" clearable label="Role" :items="['Admin', 'User']" variant="outlined" />
        </div>



        <v-btn type="submit" color="black" size="x-large" block class="rounded-lg">
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>


<style lang="scss" scoped></style>