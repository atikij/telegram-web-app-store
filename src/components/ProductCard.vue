<template>
  <div class="product-list">
    <div class="product-item" v-for="product in products" :key="product.id">
      <img src="../assets/rose.jpg" alt="Product Image" class="product-image"/>
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Цена: {{ product.price }} руб.</p>
        <button @click="addToCart(product.id)">Добавить в корзину</button>
      </div>
    </div>
    <!-- Вставляем компонент корзины -->
  </div>
</template>
<script>
import flowerData from "@/assets/flowers.json";
import CartView from "@/views/CartView.vue";
export default {
  data() {
    return {
      products: flowerData,
      cart: [], // Инициализируем корзину пустым массивом
    };
  },
  methods: {
    isInCart(itemId) {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItem = this.cart.find(({ id }) => id === itemId);
      return Boolean(cartItem);
    },
    addToCart(itemId) {
      const item = this.products.find(({ id }) => id === itemId);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
    removeFromCart(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const index = cartItems.findIndex(({ id }) => id === itemId);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
  },
};
</script>
<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
}

.product-item {
  width: calc(33.33% - 20px); /* Уменьшено расстояние между карточками */
  background-color: black;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  transition: transform 0.3s;
  overflow: hidden; /* Обрезать изображение, если оно не соответствует карточке */
}

.product-item:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: auto;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.product-details {
  padding: 15px;
}

/* Добавлен стиль для кнопки "Добавить в корзину" (может быть изменен в зависимости от ваших потребностей) */
.product-item button {
  background-color: blue;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-item button:hover {
  background-color: darkblue;
}

@media screen and (max-width: 768px) {
  .product-item {
    width: calc(50% - 20px); /* Для экранов с шириной до 768px, уменьшаем количество карточек в ряду */
  }
}


::-webkit-scrollbar {
  width: 0px; /* Ширина полосы прокрутки */
}
</style>

