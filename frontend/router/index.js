// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import FormView from '@/views/FormView.vue'  // 路由會對應到的元件
import ProtectedView from '@/views/ProtectedView.vue' // 受保護頁面
import LoginView from '@/views/LoginView.vue' // 登入頁面
import RegisterView from '@/views/RegisterView.vue'; // 引入註冊頁面
import Horoscope from '@/views/Horoscope.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,  // 登入頁面
  },
  {
    path: '/register', // 註冊頁面的路由
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/form', // 註冊頁面的路由
    name: 'Form',
    component: FormView,
  },
  {
    path: '/protected',
    name: 'Protected',
    component: ProtectedView,  // 需要登入才能訪問的頁面
  },
  {
    path: "/horoscope/:zodiacSign",
    name: "Horoscope",
    component: Horoscope,
    props: true,  // 啟用 props 來接收路由參數
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
