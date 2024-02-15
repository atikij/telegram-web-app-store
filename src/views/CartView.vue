<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-for="(group, groupId) in groupedCart" :key="groupId" class="cart-item">
      <img src="../assets/rose.jpg" alt="Product Image" class="cart-image" />
      <div class="cart-details">
        <h3>{{ group[0].name }}</h3>
        <p>Цена: {{ group[0].price }} руб.</p>
        <p>Количество: {{ group.length }}</p>
        <button @click="removeFromCart(group[0].id)">Удалить из корзины</button>
      </div>
    </div>
    <div class="total">
      <p>Общая сумма: {{ getTotalPrice() }} руб.</p>
    </div>
    <div class="pay">
      <button @click="MakingPayment()">Оплатить</button>
    </div>
  </div>
</template>

<script>
//import axios from '@/services/axios.js';
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    groupedCart() {
      // Группировка элементов корзины по их идентификатору
      const grouped = {};
      this.cart.forEach(item => {
        const groupId = item.id;
        if (!grouped[groupId]) {
          grouped[groupId] = [];
        }
        grouped[groupId].push(item);
      });
      return grouped;
    },
  },
  methods: {
    getTotalPrice() {
      // вычислите общую сумму
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
    removeFromCart(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const index = cartItems.findIndex(({ id }) => id === itemId);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
    getCart() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
  },
  beforeMount() {
    this.getCart();
  },
};
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cart-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.cart-details {
  flex-grow: 1;
}

.cart-details h3 {
  margin-bottom: 5px;
}

.cart-details p {
  margin: 0;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #267bb5;
}

.total {
  margin-top: 20px;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}
</style>
