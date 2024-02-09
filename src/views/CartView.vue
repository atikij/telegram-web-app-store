<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-for="(c, index) in cart" :key="c.id" class="cart-item">
      <img src="../assets/rose.jpg" alt="Product Image" class="cart-image" />
      <div class="cart-details">
        <h3>{{ c.name }}</h3>
        <p>Цена: {{ c.price }} руб.</p>
        <button @click="removeFromCart(index)">Удалить из корзины</button>
      </div>
    </div>
    <div class="total">
      <p>Общая сумма: {{}} руб.</p>
    </div>
  </div>
</template>

<script>
import flowerData from "@/assets/flowers.json";
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
    };
  },
  methods: {
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
