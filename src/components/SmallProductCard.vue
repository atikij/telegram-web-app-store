<template>
  <div class="product-card">
    <h1>{{ product.name }}</h1>
    <img :src="product.img" :alt="product.name" />
    <p>Description: {{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
  </div>
</template>
<script>
export default {
  name: 'SmallProductCard',
  props: ['name_english'],
  data() {
    return {
    };
  },
  computed:{
    productId () {
      return this.$route.params.name_english;
    },
    product () {
      return this.$store.getters.getProduct(this.productId);
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
}
.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
