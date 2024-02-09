<template>
  <div class="main-window-template">
    <div class="main-window-search-container">
      <input type="text" v-model="searchText" placeholder="Поиск" />
      <button @click="performSearch">Искать</button>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="main-window-navigation">
      <RouterLink to="/home" class="nav-item">главная</RouterLink>
      <RouterLink to="/cart" class="nav-item">корзина</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      products: [ /* Замените это на ваши реальные данные продуктов */ ],
      searchResults: [],
    };
  },
  methods: {
    performSearch() {
      // Простой пример поиска по имени продукта
      this.searchResults = this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log('Выполняется поиск:', this.searchText);
    },
  },
};
</script>

<style scoped>
.main-window-search-container {
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.main-window-search-container input {
  flex: 1; /* Занимает доступное пространство */
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.main-window-search-container button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.main-window-template {
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
