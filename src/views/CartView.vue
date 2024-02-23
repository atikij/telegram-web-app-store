<template>
  <div class="cart">
    <h1>Корзина {{ getTotalQuantity() }} товаров</h1>
    <div v-for="(group, groupId) in groupedCart" :key="groupId" class="cart-item">
      <img :src="group[0].image" alt="Product Image" class="cart-image" />
      <div class="cart-details">
        <h3>{{ group[0].name }}</h3>
        <p>{{ getTotalItemPrice(group) }}₽</p>
        <div class="delete">
        <button @click="removeFromCartCompletely(group[0].id)">×</button>
        </div>
        <div class="quantity-controls-cart">
        <button @click="removeFromCart(group[0].id)">−</button>
        <p>{{ group.reduce((total, item) => total + item.quantity, 0) }}</p>
        <button @click="addToCart(group[0].id)">+</button>
        </div>
      </div>
    </div>
  </div>
  <div class="pay">
    <button  @click="openModal">
      <span style="left: 2vh;position: fixed;">{{ getTotalQuantity() }} товаров </span>
      <span>К оформлению </span>
        <span style="right: 2vh;position: fixed">{{ getTotalPrice() }}₽</span>
    </button>
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
    removeFromCartCompletely(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const index = cartItems.findIndex(({ id }) => id === itemId);

      if (index !== -1) {
        // Если элемент найден в корзине, удаляем его полностью
        cartItems.splice(index, 1);

        // Обновляем количество товаров в локальном хранилище
        localStorage.setItem("cart", JSON.stringify(cartItems));
        this.cart = JSON.parse(localStorage.getItem("cart"));
      }
    },
    getTotalItemPrice(group) {
      return (group[0].price * group.reduce((total, item) => total + item.quantity, 0)).toFixed(2);
    },
    getTotalQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
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
.delete button {
  margin-top: 15px;
  position: absolute;
  background-color: #DCDCDC;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: black;
  border-radius: 5px;
}

.pay {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom:7%;
  position: fixed;
}

.pay button {
  width: 100%;
  background-color: #FFAFCC;
  color: #fff;
  margin: 10px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cart {
  //max-width: 800px;
  padding: 10px;
}

.cart-item {
  background-color:gainsboro;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cart-image {
  width: 20vh;
  height: 20vb;
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

.quantity-controls-cart {
  display: flex;
  position: absolute;
  right: 1rem;
  width: 20%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  overflow: hidden;
  border: 2px solid gray;
  border-radius: 10px;
}

.quantity-controls-cart button {
  background-color: gainsboro;
  border: none;
  width: 100%;
  height: 4vh;
}

.quantity-controls button:hover {
  background-color: #ccc;
}

.quantity-controls span {
  margin: 0 5px;
}

.quantity-controls span {
  padding: 8px 12px;
}



.total {
  margin-top: 20px;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}
</style>

