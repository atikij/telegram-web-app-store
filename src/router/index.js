import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import CartView from "@/views/CartView.vue";
import ProductCard from "@/components/ProductCard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: ProductCard
    },
    {
      path:'/cart',
      name: 'cart',
      component: CartView
    }
  ]
})

export default router
