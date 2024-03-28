<template>
  <div class="product-card">
    <router-link to="/" style="color: var(--tg-theme-text-color)">Назад</router-link>
    <h1>{{ product.name }}</h1>
    <Carousel>
      <Slide v-for="(image, index) in product.img" :key="index">
        <div class="carousel__item">
          <img :src="image || notFoundImage" alt="Slide Image" class="product-image" />
        </div>
      </Slide>
      <template #addons>
        <Pagination/>
      </template>
    </Carousel>
    <h2>{{ product.price }}₽</h2>
    <h4 style="color: var(--tg-theme-hint-color)">Описание: {{ product.description }}</h4>
  </div>
  <div class="pay">
    <div v-if="showCartButtons || getProductQuantity(product.name_english) > 0" class="add-remove-container">
      <div class="quantity-controls-card-details">
        <button class="quantity-btn" @click="removeFromCart(product.name_english)" style="font-size: 24px;color: var(--tg-theme-text-color);">-</button>
        <span>{{getProductQuantity(product.name_english) || 0}}</span>
        <button class="quantity-btn" @click="addToCart(product.name_english)" style="font-size: 24px;color:var(--tg-theme-text-color);">+</button>
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
.quantity-controls-card-details {
  background: var(--tg-theme-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  border: 2px solid var(--tg-theme-text-color);
  border-radius: 10px;
  color: var(--tg-theme-text-color);
  width: 55%;
}
.quantity-controls-card-details,
.to-cart-btn{
  height: 36px;
}

.quantity-controls-card-details button {
  background: var(--tg-theme-bg-color);
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
  font-size: 15px;
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  margin: 10px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-card {
  padding: 20px;
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
  width: calc(100% - 20px); /* Учитываем отступы слева и справа */
  margin: 10px; /* Устанавливаем отступы справа и слева */
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.to-cart-btn{
  display: flex; /* Делаем контейнер flex */
  justify-content: center; /* Выравниваем по горизонтали по центру */
  align-items: center; /* Выравниваем по вертикали по центру */
  width: 40%;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  padding: 0.6vh;
  border: 2px solid var(--tg-theme-text-color);
  border-radius: 10px;
}

</style>
