<template>
  <div class="cart">
    <h1>Корзина {{ getTotalQuantity() }} товаров</h1>
    <div v-for="(group, groupId) in groupedCart" :key="groupId" class="cart-item">
      <Carousel class="image">
        <Slide v-for="(image, index) in group[0].img" :key="index">
          <img :src="image || notFoundImage" alt="Slide Image" class="cart-image" />
        </Slide>
        <template #addons>
          <Pagination/>
        </template>
      </Carousel>
      <div class="cart-details">
        <h3>{{ group[0].name }}</h3>
        <p>{{ getTotalItemPrice(group) }}₽</p>
        <div class="delete">
          <button @click="removeFromCartCompletely(group[0].name_english)">×</button>
        </div>
        <div class="quantity-controls-cart">
          <button @click="removeFromCart(group[0].name_english)">−</button>
          <p>{{ group.reduce((total, item) => total + item.quantity, 0) }}</p>
          <button @click="addToCart(group[0].name_english)">+</button>
        </div>
      </div>
    </div>
  </div>
  <div class="pay">
    <button @click="pay">
      <span style="left: 2vh;position: fixed;">{{ getTotalQuantity() }} товаров </span>
      <span>К оформлению </span>
      <span style="right: 2vh;position: fixed">{{ getTotalPrice() }}₽</span>
    </button>
  </div>
</template>

<script>
import flowerData from "@/assets/flowers.json";
import axios from 'axios';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination
  },
  //name: "Cart",
  data() {
    return {
      goodsData: {
        unique_categories: [],
        unique_subcategories: [],
        goods_list: [],
      },
      products: flowerData,
      cart: [],
      notFoundImage :'https://yt3.googleusercontent.com/iRLpuvr-WoAkDmOmXQiVnk7Gf4knJ6_OmIqZRmal4FeFxwbPLkMwIWm4QZlvH9t2GojQWZ4P=s900-c-k-c0x00ffffff-no-rj'
    };
  },
  computed: {
    groupedCart() {
      // Группировка элементов корзины по их идентификатору
      const grouped = {};
      this.cart.forEach(item => {
        const groupId = item.name_english;
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
      const index = cartItems.findIndex(({ name_english }) => name_english === itemId);

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
      const item = this.products.find(({ name_english }) => name_english === itemId);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const existingItem = cartItems.find(cartItem => cartItem.name_english === itemId);

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
      const index = cartItems.findIndex(({ name_english }) => name_english === itemId);

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
})
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
  bottom:6.5vh;
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
  margin-bottom: 10vh;
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
.image{
  width: 20vh;
  height: auto;
  margin-right: 10px;
}

.cart-image {
  width: 20vh;
  height: 20vb;
  object-fit: cover;
  border-radius: 5px;
}

.carousel__pagination{
  margin-top: 10px;
  padding: 0;
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
</style>

