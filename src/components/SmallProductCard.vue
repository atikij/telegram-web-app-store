<template>
  <div class="container-back-button">
    <router-link to="/" class="back-button">Назад</router-link>
  </div>
  <div class="product-card">
    <h1 class="container-name">{{ product.name }}</h1>
    <Carousel>
      <Slide v-for="(image, index) in product.img" :key="index">
        <div class="carousel__item">
          <img :src="image || notFoundImage" alt="Slide Image" class="product-image" />
        </div>
      </Slide>
      <!--<template #addons>
        <Pagination/>
      </template>-->
    </Carousel>
    <h2 class="container-price" style="color: var(--color-pink-accent)">{{ product.price }}₽</h2>
    <div class="container-description">
    <h4 style="color: #000000;white-space: pre-line;">{{ product.description }}</h4>
    </div>
  </div>
  <div class="pay">
    <div v-if="showCartButtons || getProductQuantity(product.name_english) > 0" class="add-remove-container">
      <div class="quantity-controls-card-details">
        <button class="quantity-btn" @click="removeFromCart(product.name_english)" style="font-size: 24px;">
          <svg width="12" height="16" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 0H0.75C0.551088 0 0.360322 0.0746279 0.21967 0.207466C0.0790178 0.340304 0 0.520472 0 0.708333C0 0.896195 0.0790178 1.07636 0.21967 1.2092C0.360322 1.34204 0.551088 1.41667 0.75 1.41667H11.25C11.4489 1.41667 11.6397 1.34204 11.7803 1.2092C11.921 1.07636 12 0.896195 12 0.708333C12 0.520472 11.921 0.340304 11.7803 0.207466C11.6397 0.0746279 11.4489 0 11.25 0Z" fill="#454545"/>
          </svg>
        </button>
        <span class="span-quantity">{{getProductQuantity(product.name_english) || 0}}</span>
        <button class="quantity-btn" @click="addToCart(product.name_english)" style="font-size: 24px;">
          <svg width="12" height="16" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 4.66667H6.75V0.666667C6.75 0.489856 6.67098 0.320287 6.53033 0.195262C6.38968 0.070238 6.19891 0 6 0C5.80109 0 5.61032 0.070238 5.46967 0.195262C5.32902 0.320287 5.25 0.489856 5.25 0.666667V4.66667H0.75C0.551088 4.66667 0.360322 4.7369 0.21967 4.86193C0.0790178 4.98695 0 5.15652 0 5.33333C0 5.51014 0.0790178 5.67971 0.21967 5.80474C0.360322 5.92976 0.551088 6 0.75 6H5.25V10C5.25 10.1768 5.32902 10.3464 5.46967 10.4714C5.61032 10.5964 5.80109 10.6667 6 10.6667C6.19891 10.6667 6.38968 10.5964 6.53033 10.4714C6.67098 10.3464 6.75 10.1768 6.75 10V6H11.25C11.4489 6 11.6397 5.92976 11.7803 5.80474C11.921 5.67971 12 5.51014 12 5.33333C12 5.15652 11.921 4.98695 11.7803 4.86193C11.6397 4.7369 11.4489 4.66667 11.25 4.66667Z" fill="#454545"/>
          </svg>
        </button>
      </div>
      <router-link to="/cart" class="to-cart-btn">В корзину</router-link>
    </div>
    <button v-else class="add-to-cart-btn" @click="addToCart(product.name_english)">Добавить в корзину</button>
  </div>
</template>
<script>
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import {mapState} from "vuex";

export default {
  name: 'SmallProductCard',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  props: ['name_english'],
  data() {
    return {
      notFoundImage: 'https://example.com/not-found-image.jpg', // Замените ссылку на изображение, которое будет отображаться, если изображение товара отсутствует
      showCartButtons: false
    };
  },
  computed: {
    ...mapState(['goodsData']),
    showCartButtons() {
      // Показываем кнопки, если количество товара в корзине больше 0
      return this.getProductQuantity(this.product.name_english) > 0;
    },
    productId() {
      return this.$route.params.name_english;
    },
    product() {
      return this.$store.getters.getProduct(this.productId);
    },
  },
  created() {
    this.fetchGoodsData(); // Вызываем метод fetchGoodsData при создании компонента
  },
  methods: {
    async fetchGoodsData() {
      try {
        await this.$store.dispatch('fetchGoodsData'); // Вызываем экшен fetchGoodsData из хранилища
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    addToCart(itemNameEnglish) {
      const item = this.goodsData.goods_list.find(({ name_english }) => name_english === itemNameEnglish);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const existingItem = cartItems.find(cartItem => cartItem.name_english === itemNameEnglish);

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
      //обновление количества товаров при нажатии
      this.$forceUpdate();
    },
    removeFromCart(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const index = cartItems.findIndex(cartItem => cartItem.name_english === itemId);

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
        //обновление количества товаров при нажатии
        this.$forceUpdate();
      }
    },
    getProductQuantity(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cartItems.find(cartItem => cartItem.name_english === itemId);
      return item ? item.quantity : 0;
    },
  },
};
</script>

<style scoped>
.container-description{
  background: #F4F4F4;
  box-shadow: 3px 4px 4px 0px #00000014;
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  font-family: Inter;
  font-weight: 400;
  text-align: left;
}

.carousel__item {
  padding-left: 0vw;
  padding-right: 0vw;
}

.container-price{
  font-size: 20px;
  font-weight: 600;
  line-height: 24.2px;
  margin-left: 15px;
  margin-bottom: 15px;
}

.container-back-button{
  background: var(--color-pink-dim);
  border-radius: 0px 0px 30px 30px;
  padding: 5vh 0 20px 3vh;
  display: grid;
  justify-items: left;
  align-items: end;
  .back-button{
    color: var(--color-pink-accent);
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
    text-align: center;
  }
}

.container-name {
  font-size: 20px;
  font-weight: 600;
  line-height: 24.2px;
  text-align: left;
  margin: 15px 0 15px 0;
}

.quantity-controls-card-details {
  background: #EFEFEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 20px;
  width: 42%;
  height: 100%;
  box-shadow: 0px 4px 4px 0px #0000001A;
  .span-quantity {
    color: #454545;
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.94px;
    text-align: center;
  }
}
.quantity-controls-card-details,
.to-cart-btn{
  height: 100%;
}

.quantity-controls-card-details button {
  color: #454545;
  background: #EFEFEF;
  border: none;
  width: 100%;
  height: 100%; /* Наследует высоту родителя */
}

.pay {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom:7.5vh;
  position: fixed;
}

.add-to-cart-btn  {
  width: 100%;
  background: var(--color-pink-accent);
  color: var(--color-small-card-to-cart-text);
  margin:  10px 15px 10px 15px;
  border: none;
  padding: 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.product-card {
  padding:  0 20px 0 20px;
  position: relative;
}
.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.add-remove-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 7.5vh;
  position: fixed;
  height: 9vh;
  width: calc(100% - 20px); /* Учитываем отступы слева и справа */
  margin-left: 10px; /* Устанавливаем отступы справа и слева */
  background: var(--color-background);
  color: var(--vt-c-white);
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.to-cart-btn{
  display: flex; /* Делаем контейнер flex */
  justify-content: center; /* Выравниваем по горизонтали по центру */
  align-items: center; /* Выравниваем по вертикали по центру */
  width: 55%;
  height: 100%;
  background: var(--color-pink-accent);
  color: var(--color-small-card-to-cart-text);
  padding: 0.6vh;
  border-radius: 20px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.36px;
  text-align: center;
  box-shadow: 0px 4px 4px 0px #00000040;
}

</style>
