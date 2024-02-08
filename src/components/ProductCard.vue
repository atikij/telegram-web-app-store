<script setup>

</script>
<template>
  <div class="product-list">
    <div class="product-item" v-for="product in products" :key="product.id">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <button @click="addToCart(product)">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Продукт 1",
          description: "Это продукт 1. Описание продукта 1.",
          image: "@/assets/logo.svg"
        },
        {
          id: 2,
          name: "Продукт 2",
          description: "Это продукт 2. Описание продукта 2."
        },
        {
          id: 3,
          name: "Продукт 3",
          description: "Это продукт 3. Описание продукта 3."
        },
        {
          id: 4,
          name: "Продукт 4",
          description: "Это продукт 4. Описание продукта 4."
        },
        {
          id: 5,
          name: "Продукт 5",
          description: "Это продукт 5. Описание продукта 5."
        },
        {
          id: 6,
          name: "Продукт 6",
          description: "Это продукт 6. Описание продукта 6."
        },
        {
          id: 5,
          name: "Продукт 5",
          description: "Это продукт 5. Описание продукта 5."
        },
        {
          id: 6,
          name: "Продукт 6",
          description: "Это продукт 6. Описание продукта 6."
        },
        {
          id: 5,
          name: "Продукт 5",
          description: "Это продукт 5. Описание продукта 5."
        },
        {
          id: 6,
          name: "Продукт 6",
          description: "Это продукт 6. Описание продукта 6."
        }
      ]
    };
  }
}
</script>
<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Выравнивание карточек между промежутками */
  padding: 10px;
}

.product-item {
  width: calc(33.33% - 20px); /* Уменьшено расстояние между карточками */
  background-color: black;
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
  height: auto;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.product-details {
  padding: 15px;
}

/* Добавлен стиль для кнопки "Добавить в корзину" (может быть изменен в зависимости от ваших потребностей) */
.product-item button {
  background-color: blue;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-item button:hover {
  background-color: darkblue;
}

@media screen and (max-width: 768px) {
  .product-item {
    width: calc(50% - 20px); /* Для экранов с шириной до 768px, уменьшаем количество карточек в ряду */
  }
}


::-webkit-scrollbar {
  width: 0px; /* Ширина полосы прокрутки */
}
</style>

