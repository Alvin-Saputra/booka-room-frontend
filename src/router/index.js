// src/router/index.js
import RoomManagementView from '@/views/RoomManagementView.vue'
import UserMangementView from '@/views/UserMangementView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue' // Pastikan Anda membuat file ini
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import BookingManagementView from '@/views/BookingManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView, // Halaman Login Anda
      meta: { requiresGuest: true }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },

    {
      path: '/',
      redirect: '/dashboard'
    },

    {
      path: '/user',
      name: 'user',
      component: UserMangementView,
      meta: { requiresAuth: true } // Menandakan butuh login
    },
    {
      path: '/room',
      name: 'room',
      component: RoomManagementView,
      meta: { requiresAuth: true } // Menandakan butuh login
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingManagementView,
      meta: { requiresAuth: true } // Menandakan butuh login
    },
  ],
})

// Proteksi rute
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuth = authStore.isAuthenticated;

  // Jika halaman butuh login tapi user belum login
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'login' });
  }
  // Jika user sudah login tapi mencoba akses halaman login
  else if (to.meta.requiresGuest && isAuth) {
    next({ name: 'room' });
  }
  else {
    next();
  }
});

export default router;