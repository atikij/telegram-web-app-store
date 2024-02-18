import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import CartView from "@/views/CartView.vue";
import ProductCard from "@/components/ProductCard.vue";
import SmallProductCart from "@/components/SmallProductCart.vue";
import CategoryCard from "@/components/CategoryCard.vue";

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
    {
      path:'/home/category',
      name:'category',
      component:CategoryCard
    }
  ]
})

export default router
