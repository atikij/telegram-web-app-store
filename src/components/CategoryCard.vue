<template>
  <Carousel>
    <Slide v-for="image in images" :key="image">
      <img :src="image" alt="Slide Image" class="carousel__image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      images: [
        'https://static.tildacdn.com/tild3234-3139-4632-b865-373038623932/3137.jpg',
        'https://static.tildacdn.com/tild3234-3139-4632-b865-373038623932/3137.jpg',
        'https://static.tildacdn.com/tild3234-3139-4632-b865-373038623932/3137.jpg',
      ],
    }
  },
})
</script>

<style>
.carousel__image {
  width: 100%;
  height: auto;
}
</style>
