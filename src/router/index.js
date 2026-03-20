// src/router/index.js
import RoomManagementView from '@/views/admin/RoomManagementView.vue'
import UserMangementView from '@/views/admin/UserMangementView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import BookingManagementView from '@/views/admin/BookingManagementView.vue'
import AddBookingView from '@/views/admin/AddBookingView.vue'
import AdminLayout from '@/layout/AdminLayout.vue'
import UserLayout from '@/layout/UserLayout.vue'
import UserBookingView from '@/views/user/UserBookingView.vue'
import UserRoomView from '@/views/user/UserRoomView.vue'

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
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true }, // Proteksi diterapkan ke semua rute di dalam children
      children: [
        {
          path: '',
          redirect: '/dashboard' // Jika akses '/', langsung lempar ke dashboard
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'room',
          name: 'room',
          component: RoomManagementView,
        },
        {
          path: 'user',
          name: 'user',
          component: UserMangementView,
        },
        {
          path: 'booking',
          name: 'booking',
          component: BookingManagementView,
        },
        {
          path: '/add-booking',
          name: 'add-booking',
          component: AddBookingView, // Halaman Login Anda
        },
      ]
    },
    {
      path: '/user',
      component: UserLayout,
      meta: { requiresAuth: true },
      children: [
         {
          path: 'room',
          name: 'room',
          component: UserRoomView,
        },
        {
          path: 'booking',
          name: 'booking',
          component: UserBookingView
        },
      ]

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