import { createRouter, createWebHistory } from 'vue-router'
import CartView from "@/views/CartView.vue";
import ProductCard from "@/components/ProductCard.vue";
import SmallProductCard from "@/components/SmallProductCard.vue";

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
      path:'/products/:name_english',
      name: 'productCart',
      component: SmallProductCard,
      props: true // Позволяет передавать параметры в компонент через props
    },
  ]
})

export default router
