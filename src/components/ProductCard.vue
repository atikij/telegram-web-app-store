<template>
  <div class="categories">
    <button  @click="filterProducts('Монобукеты')">
      <img src="https://cdn-icons-png.flaticon.com/512/1261/1261146.png" alt="Монобукеты" class="category-icon" />
      <span>Монобукеты</span>
    </button>
    <button @click="filterProducts('Авторские букеты')">
      <img src="https://cdn-icons-png.flaticon.com/512/2438/2438198.png" alt="Авторские букеты" class="category-icon"/>
      <span>Авторские букеты</span>
    </button>
    <button @click="filterProducts('Букеты в корзинках')">
      <img src="https://cdn-icons-png.flaticon.com/512/4148/4148023.png" alt="Букеты в корзинках" class="category-icon"/>
      <span>Букеты в корзинках</span>
    </button>
    <button @click="filterProducts('')">
      <img src="https://cdn-icons-png.flaticon.com/512/7348/7348543.png" alt="Все категории" class="category-icon"/>
      <span>Все товары</span>
    </button>
  </div>
  <div class="product-list">
    <div class="product-item" v-for="product in displayedProducts" :key="product.id">
      <img :src="product.image || notFoundImage" alt="Product Image" class="product-image"/>
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}₽</p>
        <div class="quantity-controls">
          <button @click="removeFromCart(product.id)">-</button>
          <span>{{getProductQuantity(product.id) || 0}}</span>
          <button @click="addToCart(product.id)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import flowerData from "@/assets/flowers.json";
export default {
  data() {
    return {
      products: flowerData,
      cart:[],
      selectedCategory: null,
      notFoundImage :'https://yt3.googleusercontent.com/iRLpuvr-WoAkDmOmXQiVnk7Gf4knJ6_OmIqZRmal4FeFxwbPLkMwIWm4QZlvH9t2GojQWZ4P=s900-c-k-c0x00ffffff-no-rj'
    };
  },
  methods: {
    filterProducts(category) {
      this.selectedCategory = category;
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
      //обновление количества товаров при нажатии
      this.$forceUpdate();
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
        //обновление количества товаров при нажатии
        this.$forceUpdate();
      }
    },
    getProductQuantity(itemId) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cartItems.find(({ id }) => id === itemId);
      return item ? item.quantity : 0;
    },
  },
  computed: {
    ...mapState(['searchText']),
    displayedProducts() {
      let filteredProducts = this.products;

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
};
</script>

<style>
.categories {
  display: flex;
  justify-content: space-around;
  margin-top: 5%;

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
  width: calc(33.33% - 20px); /* Уменьшено расстояние между карточками */
  background-color: gainsboro;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  transition: transform 0.3s;
  overflow: hidden; /* Обрезать изображение, если оно не соответствует карточке */
}

.product-item:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height:20vh;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.product-details {
  padding: 15px;
}
@media screen and (max-width: 768px) {
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
  justify-content: center;
  margin-top: 10px;
  overflow: hidden;
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
</style>

