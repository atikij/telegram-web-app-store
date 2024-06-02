<template>
  <div class="container-cart">
    <h1 class="cart-title-big">Корзина</h1>
  <h1 class="cart-title-small">{{ getTotalQuantity() }} товаров</h1>
  </div>
  <div class="cart">
    <div v-for="(group, groupId) in groupedCart" :key="groupId" class="cart-item">
      <Carousel class="image">
        <Slide v-for="(image, index) in group[0].img" :key="index">
          <img :src="image || notFoundImage" alt="Slide Image" class="cart-image" />
        </Slide>
        <!--<template #addons>
          <Pagination/>
        </template>-->
      </Carousel>
      <div class="cart-details">
        <div class="cart-header">
          <h3>{{ group[0].name }}</h3>
          <p>{{ getTotalItemPrice(group) }}₽</p>
        </div>
        <div class="delete-quantity-control">
          <div class="quantity-controls-cart">
            <button @click="removeFromCart(group[0].name_english)">
              <svg width="15" height="15" viewBox="0 0 12 2" fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 0H0.75C0.551088 0 0.360322 0.0746279 0.21967 0.207466C0.0790178 0.340304 0 0.520472 0 0.708333C0 0.896195 0.0790178 1.07636 0.21967 1.2092C0.360322 1.34204 0.551088 1.41667 0.75 1.41667H11.25C11.4489 1.41667 11.6397 1.34204 11.7803 1.2092C11.921 1.07636 12 0.896195 12 0.708333C12 0.520472 11.921 0.340304 11.7803 0.207466C11.6397 0.0746279 11.4489 0 11.25 0Z"/>
              </svg>
            </button>
            <h1>{{ group.reduce((total, item) => total + item.quantity, 0) }}</h1>
            <button @click="addToCart(group[0].name_english)">
              <svg width="15" height="15" viewBox="0 0 12 11" fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 4.66667H6.75V0.666667C6.75 0.489856 6.67098 0.320287 6.53033 0.195262C6.38968 0.070238 6.19891 0 6 0C5.80109 0 5.61032 0.070238 5.46967 0.195262C5.32902 0.320287 5.25 0.489856 5.25 0.666667V4.66667H0.75C0.551088 4.66667 0.360322 4.7369 0.21967 4.86193C0.0790178 4.98695 0 5.15652 0 5.33333C0 5.51014 0.0790178 5.67971 0.21967 5.80474C0.360322 5.92976 0.551088 6 0.75 6H5.25V10C5.25 10.1768 5.32902 10.3464 5.46967 10.4714C5.61032 10.5964 5.80109 10.6667 6 10.6667C6.19891 10.6667 6.38968 10.5964 6.53033 10.4714C6.67098 10.3464 6.75 10.1768 6.75 10V6H11.25C11.4489 6 11.6397 5.92976 11.7803 5.80474C11.921 5.67971 12 5.51014 12 5.33333C12 5.15652 11.921 4.98695 11.7803 4.86193C11.6397 4.7369 11.4489 4.66667 11.25 4.66667Z" />
              </svg>
            </button>
          </div>
          <div class="delete">
            <button @click="removeFromCartCompletely(group[0].name_english)">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.88061 4.99947L9.81526 1.07065C9.93286 0.953029 9.99893 0.793505 9.99893 0.62717C9.99893 0.460834 9.93286 0.301311 9.81526 0.183694C9.69766 0.0660767 9.53815 0 9.37183 0C9.20551 0 9.04601 0.0660767 8.9284 0.183694L5 4.11876L1.0716 0.183694C0.953993 0.0660767 0.794487 1.4768e-07 0.628169 1.4892e-07C0.461851 1.50159e-07 0.302345 0.0660767 0.18474 0.183694C0.0671355 0.301311 0.001066 0.460834 0.001066 0.62717C0.001066 0.793505 0.0671355 0.953029 0.18474 1.07065L4.11939 4.99947L0.18474 8.92829C0.126202 8.98635 0.0797396 9.05544 0.0480322 9.13155C0.0163247 9.20767 0 9.28931 0 9.37176C0 9.45422 0.0163247 9.53586 0.0480322 9.61198C0.0797396 9.68809 0.126202 9.75717 0.18474 9.81524C0.2428 9.87378 0.311875 9.92025 0.387982 9.95196C0.464089 9.98367 0.545721 10 0.628169 10C0.710616 10 0.792248 9.98367 0.868355 9.95196C0.944462 9.92025 1.01354 9.87378 1.0716 9.81524L5 5.88017L8.9284 9.81524C8.98646 9.87378 9.05554 9.92025 9.13165 9.95196C9.20775 9.98367 9.28938 10 9.37183 10C9.45428 10 9.53591 9.98367 9.61202 9.95196C9.68812 9.92025 9.7572 9.87378 9.81526 9.81524C9.8738 9.75717 9.92026 9.68809 9.95197 9.61198C9.98368 9.53586 10 9.45422 10 9.37176C10 9.28931 9.98368 9.20767 9.95197 9.13155C9.92026 9.05544 9.8738 8.98635 9.81526 8.92829L5.88061 4.99947Z" />
              </svg>
            </button>
          </div>
      </div>
      </div>
    </div>
  </div>
  <div class="pay">
    <button @click="pay">
      <span class="pay-left" style="left: 2.5vh;position: fixed;">{{ getTotalQuantity() }} товаров </span>
      <span class="pay-middle">К оформлению </span>
      <span class="pay-right" style="right: 2.5vh;position: fixed;">{{ getTotalPrice() }}₽</span>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
let tg = window.Telegram.WebApp;

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
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
    pay() {
      tg.sendData(this.cart);
    }
  },
  beforeMount() {
    this.getCart();
  },
})
</script>


<style scoped>


.container-cart{
  background: var(--color-pink-dim);
  border-radius: 0px 0px 30px 30px;
  padding: 5vh 0 20px 3vh;
  margin-bottom: 10px;
  display: grid;
  justify-items: left;
  align-items: end;
  color: var(--color-pink-accent);
  .cart-title-big{
    font-family: Inter;
    font-size: 24px;
    font-weight: 600;
    line-height: 29.05px;
    text-align: center;
  }
  .cart-title-small{
    font-family: Inter;
    font-size: 20px;
    font-weight: 400;
    line-height: 24.2px;
    text-align: center;
  }
}

.delete-quantity-control{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.delete button {
  border: none;
  cursor: pointer;
  background: var(--color-background-soft);
  color: var(--color-text);
}

.pay {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom:6.5vh;
  position: fixed;
  .pay-left{
    font-family: Inter;
    font-size: 13px;
    font-weight: 500;
    line-height: 15.73px;
    text-align: center;
  }
  .pay-middle{
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    line-height: 19.36px;
    text-align: center;
  }
  .pay-right{
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.94px;
    text-align: center;
  }
}

.pay button {
  font-family: Inter;
  font-size: 15px;
  width: 100%;
  background: var(--color-pink-accent);
  color: var(--color-small-card-to-cart-text);
  margin: 10px;
  border: none;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.3s;
}

.cart {
  padding: 10px;
  margin-bottom: 10vh;
}

.cart-item {
  background-color:var(--color-background-soft);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  display: flex;
  /*align-items: center;*/
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.image{
  width: 45vw;
  height: auto;
  margin-right: 10px;
}

.cart-image {
  width: 45vw;
  height: 15vh;
  object-fit: cover;
  border-radius: 20px;
}

.carousel__pagination{
  margin-top: 10px;
  padding: 0;
}

.cart-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
}

.cart-details h3 {
  margin-bottom: 5px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 15.73px;
  text-align: left;
}

.cart-details p {
  margin: 0;
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  line-height: 18.15px;
  color: var(--color-pink-accent);
}

.cart-details h1{
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: var(--color-text);
}

.quantity-controls-cart {
  display: flex;
  right: 1rem;
  width: 60%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 20px;
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: 0px 4px 12.4px 0px rgba(0, 0, 0, 0.1);
}

.quantity-controls-cart button {
  border: none;
  width: 100%;
  height: 4vh;
  background: var(--color-background);
  color: var(--color-text);
}

.quantity-controls button:hover {
  background-color: #ccc;
}

</style>

