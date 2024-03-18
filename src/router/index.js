import { createRouter, createWebHistory } from 'vue-router'
import CartView from "@/views/CartView.vue";
import ProductCard from "@/components/ProductCard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductCard,
    },
    {
      path:'/cart',
      name: 'cart',
      component: CartView
    },
  ]
})

export default router
