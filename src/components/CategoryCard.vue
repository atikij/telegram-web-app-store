<template>
  <div>
    <div v-for="category in categories" :key="category.id">
      <h2>{{ category.name }}</h2>
      <div class="products-container">
        <div v-for="product in category.products" :key="product.id" class="product">
          <img src="../assets/rose.jpg" alt="Product Image" class="product-image-category"/>
          <p>{{ product.name }}</p>
          <p>{{ product.price }} руб.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flowerData from "@/assets/flowers.json";
export default {
  data() {
    return {
      data: flowerData,
      categories: [
        {
          id: 1,
          name: 'Категория 1',
          products: [
            { id: 1, name: 'Товар 1', price: 100, image: 'url/to/image1.jpg' },
            { id: 2, name: 'Товар 2', price: 150, image: 'url/to/image2.jpg' },
            { id: 2, name: 'Товар 2', price: 150, image: 'url/to/image2.jpg' },
            { id: 2, name: 'Товар 2', price: 150, image: 'url/to/image2.jpg' },
            { id: 2, name: 'Товар 2', price: 150, image: 'url/to/image2.jpg' },
            // Добавьте другие товары
          ],
        },
        {
          id: 2,
          name: 'Категория 2',
          products: [
            { id: 3, name: 'Товар 3', price: 120, image: 'url/to/image3.jpg' },
            { id: 4, name: 'Товар 4', price: 200, image: 'url/to/image4.jpg' },
            { id: 4, name: 'Товар 4', price: 200, image: 'url/to/image4.jpg' },
            // Добавьте другие товары
          ],
        },
        // Добавьте другие категории
      ],
    };
  },
  methods: {
    navigateToCategory(categoryId) {
      this.$router.push({ name: 'CategoryPage', params: { categoryId: categoryId } });
    },
  },
};
</script>

<style scoped>
.products-container {
  display: flex;
  overflow-x: auto;
  width: 100%; /* Установите желаемую ширину, чтобы вместить 2 товара */
  white-space: nowrap; /* Запрещаем перенос строк для отображения товаров в ряд */
}
.product-image-category {
  width: 100%;
  height: auto;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.product {
  width: 500px; /* Установите желаемую ширину товара */
  margin-right: 20px;
}
</style>
