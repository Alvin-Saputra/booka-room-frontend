import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";
import { loginUser } from "@/service/authService";
import router from "@/router";

const errorMessages = {
  'ERR_INVALID_CREDENTIALS': 'Wrong email or password',
  'ERR_DATABASE': 'Our server is currently experiencing an issue. Please try again later.',
};

export const useAuthStore = defineStore("auth", () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null);
    const token = ref(localStorage.getItem('token') || null);
    const isLoading = ref(false);
    const error = ref(null);
    const message = ref(null);

    const isAuthenticated = computed(() => !!token.value);

    const login = async (email, password) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await loginUser(email, password);

            if (response.status === 'success') {
                user.value = response.data;
                token.value = response.data.token;

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    user_name: response.data.user_name,
                    email: response.data.email,
                    role: response.data.role
                }));

                if (response.data.role === 'admin') {
                    router.push('/admin/dashboard');
                } else if (response.data.role === 'user') {
                    router.push('/user/room');
                } else {
                    router.push('/'); // Fallback jika role tidak dikenali
                }
                message.value = response.message;
                return true;

            } 
        } catch (err) {
            const code = err.response?.data?.errorCode
            error.value = errorMessages[code] || error.response?.data?.message || 'Unexpected Error';
            return false;
        }
        finally {
            isLoading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    // Getter untuk mengecek apakah user sudah login
    return { user, token, isLoading, error, message, login, logout, isAuthenticated };
});