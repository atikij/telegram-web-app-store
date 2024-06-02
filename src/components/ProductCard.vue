<template>
  <div class="container-search">
    <Search />
    <Categories :filterProducts="filterProducts" />
  </div>
  <div class="product-list">
    <div class="product-item" v-for="product in displayedProducts" :key="product.id">
      <router-link :to="{ name: 'productCart', params: { name_english: product.name_english }}">
        <Carousel>
          <Slide v-for="(image, index) in product.img" :key="index">
            <div class="carousel__item">
              <img :src="image || notFoundImage" alt="Slide Image" class="product-image" />
            </div>
          </Slide>
        </Carousel>
      </router-link>
      <div class="product-details">
        <span class="product-item-price">{{ product.price }}₽</span>
        <span class="product-item-name">{{ product.name }}</span>
        <div v-if="getProductQuantity(product.name_english) === 0" class="quantity-controls">
          <button class="add-to-cart-button" @click="addToCart(product.name_english)">Купить</button>
        </div>
        <div v-else class="quantity-controls">
          <button @click="removeFromCart(product.name_english)">
            <svg width="15" height="15" viewBox="0 0 12 0.5" fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 0H0.75C0.551088 0 0.360322 0.0746279 0.21967 0.207466C0.0790178 0.340304 0 0.520472 0 0.708333C0 0.896195 0.0790178 1.07636 0.21967 1.2092C0.360322 1.34204 0.551088 1.41667 0.75 1.41667H11.25C11.4489 1.41667 11.6397 1.34204 11.7803 1.2092C11.921 1.07636 12 0.896195 12 0.708333C12 0.520472 11.921 0.340304 11.7803 0.207466C11.6397 0.0746279 11.4489 0 11.25 0Z"/>
            </svg>
          </button>
          <input
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              :value="getProductQuantity(product.name_english)"
              min="0"
              @change="handleQuantityInput(product.name_english, $event)"
          >
          <button @click="addToCart(product.name_english)">
            <svg width="15" height="15" viewBox="0 0 12 10" fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 4.66667H6.75V0.666667C6.75 0.489856 6.67098 0.320287 6.53033 0.195262C6.38968 0.070238 6.19891 0 6 0C5.80109 0 5.61032 0.070238 5.46967 0.195262C5.32902 0.320287 5.25 0.489856 5.25 0.666667V4.66667H0.75C0.551088 4.66667 0.360322 4.7369 0.21967 4.86193C0.0790178 4.98695 0 5.15652 0 5.33333C0 5.51014 0.0790178 5.67971 0.21967 5.80474C0.360322 5.92976 0.551088 6 0.75 6H5.25V10C5.25 10.1768 5.32902 10.3464 5.46967 10.4714C5.61032 10.5964 5.80109 10.6667 6 10.6667C6.19891 10.6667 6.38968 10.5964 6.53033 10.4714C6.67098 10.3464 6.75 10.1768 6.75 10V6H11.25C11.4489 6 11.6397 5.92976 11.7803 5.80474C11.921 5.67971 12 5.51014 12 5.33333C12 5.15652 11.921 4.98695 11.7803 4.86193C11.6397 4.7369 11.4489 4.66667 11.25 4.66667Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="div-to-cart-btn">
    <router-link v-show="hasItemsInCart" to="/cart" class="to-cart-btn-home">Перейти в корзину</router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import {mapActions, mapState} from 'vuex';
import SmallProductCard from "@/components/SmallProductCard.vue";
import Categories from "@/components/Categories.vue";
import Search from "@/components/Search.vue";

export default defineComponent({
  name: 'Basic',
  components: {
    Search,
    Carousel,
    Slide,
    Pagination,
    SmallProductCard,
    Categories
  },
  data() {
    return {
      cart:[],
      hasItemsInCart: false,
      selectedCategory: null,
      notFoundImage :'https://yt3.googleusercontent.com/iRLpuvr-WoAkDmOmXQiVnk7Gf4knJ6_OmIqZRmal4FeFxwbPLkMwIWm4QZlvH9t2GojQWZ4P=s900-c-k-c0x00ffffff-no-rj'
    };
  },
  methods: {
    ...mapActions(['fetchGoodsData']), // Используйте mapActions для вызова действия fetchGoodsData
    hideKeyboardOnOutsideClick(event) {
      if (!event.target.closest('.quantity-controls')) { // Если клик был сделан вне элемента .quantity-controls
        document.activeElement.blur(); // Скрыть клавиатуру
      }
    },
    checkCartItems() {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      this.hasItemsInCart = cartItems.length > 0;
    },
    handleQuantityInput(itemNameEnglish, event) {
      const newQuantity = parseInt(event.target.value);
      this.updateCart(itemNameEnglish, newQuantity);
    },
    updateCart(itemNameEnglish, newQuantity) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const itemIndex = cartItems.findIndex(item => item.name_english === itemNameEnglish);

      if (itemIndex !== -1) {
        // Товар уже в корзине, обновляем количество
        if (newQuantity > 0) {
          cartItems[itemIndex].quantity = newQuantity;
        } else {
          // Если новое количество равно 0 или отрицательное, удаляем товар из корзины
          cartItems.splice(itemIndex, 1);
          //показываем кнопку перейти в корзину
          this.checkCartItems();
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } else {
        // Товар не найден в корзине, добавляем его с помощью метода addToCart
        this.addToCart(itemNameEnglish);
      }
    },

    filterProducts(category) {
      this.selectedCategory = category;
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
      //показываем кнопку перейти в корзину
      this.checkCartItems();
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
        //показываем кнопку перейти в корзину
        this.checkCartItems();
      }
    },
    getProductQuantity(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cartItems.find(cartItem => cartItem.name_english === itemId);
      return item ? item.quantity : 0;
    },
  },
  computed: {
    ...mapState(['searchText', 'goodsData']),
    isHomePage() {
      return this.$route.path === '/';
    },
    displayedProducts() {
      let filteredProducts = this.goodsData.goods_list;

      // Фильтрация по категории
      if (this.selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === this.selectedCategory);
      }

      // Фильтрация по тексту поиска
      if (this.searchText.trim() !== '') {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }

      return filteredProducts;
    },
  },
  mounted() {
    this.checkCartItems();
    this.fetchGoodsData();
  },
})
</script>

<style>
.container-search{
  background: var(--color-pink-dim);
  border-radius: 0px 0px 30px 30px;
  padding-top: 15px;
  display: grid;
  justify-items: center;
  align-items: end;
  margin-bottom: 2vh;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  overflow: hidden;
  margin-bottom: 10vh;
}

.product-item {
  display: flex;
  flex-direction: column;
  /*width: calc(33.33% - 20px); /* Уменьшено расстояние между карточками */
  width: 45vw;
  /*height: 25vh;*/
  color: var(--color-text);
  background: var(--color-background-soft);
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  margin: 0 0 20px 0;
}

.product-image {
  width: 100%;
  height:15vh;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;

}
.carousel__item {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Изображение заполняет контейнер, сохраняя пропорции */
}

.product-details {
  position: relative; /* Относительное позиционирование для корректного позиционирования quantity-controls */
  padding: 0 10px 10px 10px;
  flex-grow: 1; /* Занимает всю доступную высоту внутри .product-item */
  overflow: hidden; /* Обрезаем содержимое, чтобы избежать перекрытия */
  display: flex; /* Размещаем дочерние элементы внутри product-details в виде flex-контейнера */
  flex-direction: column; /* Отображаем дочерние элементы в колонку */
}

::-webkit-scrollbar {
  width: 0; /* Ширина полосы прокрутки */
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: auto; /* Размещаем контролы внизу карточки */
  border-radius: 20px;
  width: 100%;
  height: 4vh;
  box-shadow: 0px 4px 12.4px 0px #0000001A;
  .add-to-cart-button{
    font-family: Inter;
    font-weight: 600;
    text-align: center;
    color: var(--color-pink-accent);
  }
}
.quantity-controls input[type="number"]{
  width: 46px;
  height: 100%;
  text-align: center;
  background-color: var(--color-background);
  border: none;
  border-radius: 0; /* Убирает все закругления */
  font-size: 15px;
  font-family: Inter , sans-serif;
  font-weight: 500;
  color: var(--color-text);
}

.quantity-controls button {
  background-color: var(--color-background);
  color: var(--color-text);
  border: none;
  width: 100%;
  height: 100%;
}

.div-to-cart-btn{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom:6.5vh;
  position: fixed;
}
.to-cart-btn-home {
  width: 100%;
  background: var(--color-pink-accent);
  color: var(--color-pink-dim);
  margin: 10px;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center; /* Выравниваем текст по центру */
  display: block; /* Превращаем кнопку в блочный элемент, чтобы ширина 100% работала правильно */
  box-sizing: border-box; /* Учитываем внутренние отступы и границы в размерах кнопки */
  font-size: 16px;
  font-weight: 500;
  line-height: 19.36px;
  box-shadow: 0px 4px 4px 0px #00000040;

}

.carousel__pagination{
  padding: 0;
  margin-top: 0;
}

.product-item-price {
  color: var(--color-pink-accent);
  font-size: 18px;
  font-weight: 600;
  line-height: 18.15px;
}

.product-item-name {
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  margin-bottom: 10px;
}
</style>

