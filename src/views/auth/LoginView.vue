<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { storeToRefs } from 'pinia'
import meeting_room from '@/assets/images/meeting_room_2.jpg';
import Alert from '@/components/common/Alert.vue';

const authStore = useAuthStore();

const { isLoading, message } = storeToRefs(authStore);


const email = ref(null);
const password = ref(null);
const showPassword = ref(false);

const alertConfig = reactive({
    show: false,
    type: 'success',
    title: 'Success',
    message: ''
});


const triggerAlert = (type, title, msg) => {
    alertConfig.type = type;
    alertConfig.title = title;
    alertConfig.message = msg;
    alertConfig.show = true;
};

const handleSubmit = async () => {
    const isSuccess = await authStore.login(email.value, password.value);
    if (isSuccess) {
        triggerAlert('success', 'Success', message.value);

    }
    else {
        triggerAlert('error', 'Error', message.value);

    }
};
</script>

<template>
    <div class="w-full min-h-screen flex items-center justify-center">

        <img :src="meeting_room" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Blur overlay -->
        <div class="absolute inset-0 backdrop-blur-sm bg-black/20"></div>


        <v-card class="w-full max-w-xl p-8 rounded-xl shadow-lg">
            <h1 class=" mb-6 text-center">
                Login
            </h1>

            <p class="text-center">Please Enter Your Credentials</p>

            <v-form @submit.prevent="handleSubmit">
                <v-text-field v-model="email" label="Email" variant="outlined" class="mb-4" type="email" />

                <v-text-field v-model="password" label="Password" :type="showPassword ? 'text' : 'password'"
                    variant="outlined" class="mb-4" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword" />

                <v-btn type="submit" size="x-large" block class="text-white rounded-lg hover:bg-gray-500 "
                    color="black">
                    Login
                </v-btn>
            </v-form>
        </v-card>
    </div>

    <Alert v-model="alertConfig.show" :type="alertConfig.type" :title="alertConfig.title"
        :message="alertConfig.message" />
</template>



<style lang="scss" scoped></style>