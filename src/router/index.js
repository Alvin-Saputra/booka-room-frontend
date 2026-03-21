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
import BookingFormView from '@/views/user/BookingFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '',
      redirect: '/login',
      meta: { requiresGuest: true }
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard' // [PERBAIKAN] Redirect ke /admin/dashboard
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard', // [PERBAIKAN] Beri prefix agar lebih aman
          component: DashboardView,
        },
        {
          path: 'room',
          name: 'admin-room', // [PERBAIKAN] Nama diubah menjadi unik
          component: RoomManagementView,
        },
        {
          path: 'user',
          name: 'admin-user',
          component: UserManagementView,
        },
        {
          path: 'booking',
          name: 'admin-booking',
          component: BookingManagementView,
        },
        {
          path: 'add-booking', // [PERBAIKAN] Hilangkan '/' agar tetap berada di bawah /admin
          name: 'admin-add-booking',
          component: BookingCreateView,
        },
      ]
    },
    {
      path: '/user',
      component: UserLayout,
      meta: { requiresAuth: true, role: 'user' },
      children: [
        {
          path: '',
          redirect: '/user/room'
        },
        {
          path: 'room',
          name: 'user-room', // [PERBAIKAN] Nama diubah menjadi unik
          component: RoomCatalogView,
        },
        {
          path: 'booking-room',
          name: 'user-booking-room', // [PERBAIKAN] Nama diubah menjadi unik
          component: BookingFormView,
        },
        {
          path: 'booking-history',
          name: 'user-booking-history',
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
  const userRole = authStore.user?.role; // Ambil role dari state Pinia

  // 1. Jika belum login tapi mau ke halaman yang butuh login


  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'login' });
  }
  // 2. Jika sudah login tapi mau ke halaman login (Re-visit web)
  else if (to.meta.requiresGuest && isAuth) {
    if (userRole === 'admin') next({ name: 'admin-dashboard' });
    else if (userRole === 'user') next({ name: 'user-room' });
    else next();
  }
  // 3. Jika sudah login, cek apakah role-nya sesuai dengan meta route
  else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    // Jika role tidak cocok, tendang kembali ke halaman masing-masing
    if (userRole === 'admin') next({ name: 'admin-dashboard' });
    else if (userRole === 'user') next({ name: 'user-room' });
    else next({ name: 'login' });
  }
  // 4. Jika semua aman, izinkan masuk
  else {
    next();
  }
});

export default router;