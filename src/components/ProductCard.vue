<script setup>

</script>

<template>
  <div class="product-list">
    <div class="product-item" v-for="product in products">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <button @click="addToCart(product)">Добавить в корзину</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Продукт 1",
          description: "Это продукт 1. Описание продукта 1."
        },
        {
          id: 2,
          name: "Продукт 2",
          description: "Это продукт 2. Описание продукта 2."
        },
        {
          id: 3,
          name: "Продукт 3",
          description: "Это продукт 3. Описание продукта 3."
        },
        {
          id: 4,
          name: "Продукт 4",
          description: "Это продукт 4. Описание продукта 4."
        },
        {
          id: 5,
          name: "Продукт 5",
          description: "Это продукт 5. Описание продукта 5."
        },
        {
          id: 6,
          name: "Продукт 6",
          description: "Это продукт 6. Описание продукта 6."
        }
      ]
    };
  }
}
</script>
<style>
.main-window-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: blue;
  border-top: 1px solid #ddd;
}

.nav-item {
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: black;
}

.product-list {
  margin-top: 60px;
  height: 80vh;
  overflow-y: scroll;
  padding: 10px;
}

.product-item {
  background-color: black;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
  transition: transform 0.3s;
}

.product-item:hover {
  transform: translateY(-5px);
}
</style>

