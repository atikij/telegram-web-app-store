<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-for="(group, groupId) in groupedCart" :key="groupId" class="cart-item">
      <img src="../assets/rose.jpg" alt="Product Image" class="cart-image" />
      <div class="cart-details">
        <h3>{{ group[0].name }}</h3>
        <p>Цена: {{ group[0].price }} руб.</p>
        <div class="quantity-controls">
        <button @click="removeFromCart(group[0].id)">-</button>
        <p>{{ group.reduce((total, item) => total + item.quantity, 0) }}</p>
        <button @click="addToCart(group[0].id)">+</button>
        </div>
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
import flowerData from "@/assets/flowers.json";

export default {
  name: "Cart",
  data() {
    return {
      products: flowerData,
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
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    addToCart(itemId) {
      const item = this.products.find(({ id }) => id === itemId);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const existingItem = cartItems.find(cartItem => cartItem.id === itemId);

      if (existingItem) {
        // Если товар уже в корзине, увеличиваем количество
        existingItem.quantity += 1;
      } else {
        // Если товара нет в корзине, добавляем новый элемент с начальным количеством 1
        item.quantity = 1;
        cartItems.push(item);
      }

      // Обновляем количество товаров в локальном хранилище
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
    removeFromCart(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const index = cartItems.findIndex(({ id }) => id === itemId);

      if (index !== -1) {
        const existingItem = cartItems[index];
        if (existingItem.quantity > 1) {
          // Если у товара количество больше 1, уменьшаем количество
          existingItem.quantity -= 1;
        } else {
          // Если у товара количество равно 1 или меньше, удаляем его из корзины
          cartItems.splice(index, 1);
        }

        // Обновляем количество товаров в локальном хранилище
        localStorage.setItem("cart", JSON.stringify(cartItems));
        this.cart = JSON.parse(localStorage.getItem("cart"));
      }
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
  align-items: center;
  justify-content: space-between;
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

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-controls button:hover {
  background-color: #267bb5;
}

.quantity-controls span {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
}

.total {
  margin-top: 20px;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}
</style>

