// src/router/index.js
import RoomManagementView from '@/views/admin/RoomManagementView.vue'
import UserManagementView from '@/views/admin/UserManagementView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import BookingManagementView from '@/views/admin/BookingManagementView.vue'
import BookingCreateView from '@/views/admin/BookingCreateView.vue'
import AdminLayout from '@/layout/AdminLayout.vue'
import UserLayout from '@/layout/UserLayout.vue'
import RoomCatalogView from '@/views/user/RoomCatalogView.vue'
import BookingHistoryView from '@/views/user/BookingHistoryView.vue'

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
          component: UserManagementView,
        },
        {
          path: 'booking',
          name: 'booking',
          component: BookingManagementView,
        },
        {
          path: '/add-booking',
          name: 'add-booking',
          component: BookingCreateView, // Halaman Login Anda
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
          component: RoomCatalogView,
        },
        {
          path: 'booking-history',
          name: 'booking-history',
          component: BookingHistoryView
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