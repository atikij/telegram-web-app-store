<template>
  <div class="categories">
    <button  @click="filterProducts('Монобукеты')">
      <img src="https://cdn-icons-png.flaticon.com/512/1261/1261146.png" alt="Монобукеты" class="category-icon" />
      <span>Монобукеты</span>
    </button>
    <button @click="filterProducts('Авторские_букеты')">
      <img src="https://cdn-icons-png.flaticon.com/512/2438/2438198.png" alt="Авторские букеты" class="category-icon"/>
      <span>Авторские букеты</span>
    </button>
    <button @click="filterProducts('Цветы_в_коробке')">
      <img src="https://cdn-icons-png.flaticon.com/512/4148/4148023.png" alt="Букеты в корзинках" class="category-icon"/>
      <span>Букеты в корзинках</span>
    </button>
    <button @click="filterProducts(null)">
      <img src="https://cdn-icons-png.flaticon.com/512/7348/7348543.png" alt="Все категории" class="category-icon"/>
      <span>Все товары</span>
    </button>
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
          <template #addons>
            <Pagination/>
          </template>
        </Carousel>
      </router-link>
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}₽</p>
        <div class="quantity-controls">
          <button @click="removeFromCart(product.name_english)">-</button>
          <span>{{getProductQuantity(product.name_english) || 0}}</span>
          <button @click="addToCart(product.name_english)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import {mapActions, mapState} from 'vuex';
import SmallProductCard from "@/components/SmallProductCard.vue";

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    SmallProductCard
  },
  data() {
    return {
      cart:[],
      selectedProduct: null,
      selectedCategory: null,
      notFoundImage :'https://yt3.googleusercontent.com/iRLpuvr-WoAkDmOmXQiVnk7Gf4knJ6_OmIqZRmal4FeFxwbPLkMwIWm4QZlvH9t2GojQWZ4P=s900-c-k-c0x00ffffff-no-rj'
    };
  },
  methods: {
    ...mapActions(['fetchGoodsData']), // Используйте mapActions для вызова действия fetchGoodsData
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
  computed: {
    ...mapState(['searchText', 'goodsData']),
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
    this.fetchGoodsData();
  },
})
</script>

<style>
.categories {
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  overflow: hidden; /* Добавляем полосу прокрутки при нехватке места */
  max-width: 100%; /* Ограничиваем максимальную ширину до 100% ширины родительского контейнера */
}

.categories button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
}

.categories span{
  font-family: Roboto,sans-serif;
}

.category-icon {
  width: 50%; /* Установите желаемую ширину и высоту для иконки */
  height: 50%;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
}

.product-item {
  display: flex;
  flex-direction: column;
  width: calc(33.33% - 20px); /* Уменьшено расстояние между карточками */
  background-color: gainsboro;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  overflow: hidden; /* Обрезать изображение, если оно не соответствует карточке */
}

.product-image {
  width: 100%;
  height:20vh;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.product-details {
  position: relative; /* Относительное позиционирование для корректного позиционирования quantity-controls */
  padding: 0 15px 15px 15px;
  flex-grow: 1; /* Занимает всю доступную высоту внутри .product-item */
  overflow: hidden; /* Обрезаем содержимое, чтобы избежать перекрытия */
  display: flex; /* Размещаем дочерние элементы внутри product-details в виде flex-контейнера */
  flex-direction: column; /* Отображаем дочерние элементы в колонку */
}
@media screen and (max-width: 767px) {
  .product-item {
    width: calc(50% - 20px); /* Для экранов с шириной до 768px, уменьшаем количество карточек в ряду */
  }
}

::-webkit-scrollbar {
  width: 0; /* Ширина полосы прокрутки */
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-top: auto; /* Размещаем контролы внизу карточки */
  border: 2px solid gray;
  border-radius: 10px;
}


.quantity-controls button {
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

.categories span{
  padding: 12px;
}

.carousel__pagination{
  padding: 0;
  margin-top: 0;
}
</style>

