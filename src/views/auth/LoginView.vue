<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { storeToRefs } from 'pinia'


const authStore = useAuthStore();

const { isLoading, message } = storeToRefs(authStore);


const email = ref(null);
const password = ref(null);
const showPassword = ref(false);

const handleSubmit = async () => {
    const isSuccess = await authStore.login(email.value, password.value);
    if (isSuccess) {
        alert(message.value);
    }
    else {
        alert(message.value);
    }
};
</script>

<template>
    <div class="w-full min-h-screen flex items-center justify-center">
        <v-card class="w-full max-w-2xl p-6 rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">
                Login
            </h2>

            <v-form @submit.prevent="handleSubmit">
                <v-text-field v-model="email" label="Email" variant="outlined" class="mb-4" type="email"/>

                <v-text-field 
                    v-model="password" 
                    label="Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    variant="outlined"
                    class="mb-4" 
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" 
                    @click:append-inner="showPassword = !showPassword" />

                <v-btn type="submit" color="primary" block>
                    Submit
                </v-btn>
            </v-form>
        </v-card>
    </div>
</template>



<style lang="scss" scoped></style>