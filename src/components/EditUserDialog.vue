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
    user: {
        type: Object,
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

watch(
    () => props.user,
    (newUser) => {
        if (!newUser) return;
        name.value = newUser.name;
        email.value = newUser.email;
        role.value = newUser.role;
    },
    { immediate: true, deep: true }
);



</script>


<template>
  <v-dialog
    v-model="isDialogVisible"
    max-width="400"
    class="p-6"
  >
    <v-card class="w-full max-w-2xl p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Edit User
      </h2>

      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="name"
          label="Name"
          variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          variant="outlined"
          class="mb-4"
        />



        <v-combobox
          v-model="role"
          clearable
          label="Role"
          :items="['Admin', 'User']"
          variant="outlined"
          class="mb-6"
        />

        <v-btn
          type="submit"
          color="primary"
          block
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>


<style lang="scss" scoped></style>