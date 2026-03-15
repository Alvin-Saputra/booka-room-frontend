import RoomManagementView from '@/views/RoomManagementView.vue'
import UserMangementView from '@/views/UserMangementView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: UserMangementView,
    },
  
    {


      path: '/room',
      name: 'room',
      component: RoomManagementView,
    },

  ],
})

export default router
