<!-- ProductCard.vue -->
<template>
 {{2}}
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['product']);
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-description {
  font-size: 14px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
}
</style>
