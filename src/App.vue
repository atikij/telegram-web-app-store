<template>
  <body class="main-app">
  <div class="main-window-template">
    <div class="main-window-search-container">{{1}}</div>
    <div>
      <router-view/>
    </div>
    <div class="main-window-navigation">
      <RouterLink to="/home" class="nav-item">главная</RouterLink>
      <RouterLink to="/cart" class="nav-item">корзина</RouterLink>
    </div>
  </div>
</body>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
import ProductCard from '@/views/CartView.vue';
import MainView from "@/views/MainView.vue";
export default {
  data(){
    return {

    }
  },
}
</script>


<style scoped>
.main-app {
  margin: 0;
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
  height: 100vh;
  width: 100vh;
}

.main-window-template {
  display: grid;
  width: 100vh;
  height: 100vh;
  grid-template-rows: 10vh 80vh 10vh;
  align-items: center;
  align-content: center;
}

.main-window-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}

.nav-item {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #ddd;
}


</style>
