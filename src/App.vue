<template>
  <div class="main-window-template">
    <div class="main-content">
      <router-view/>
    </div>
    <div class="main-window-navigation">
      <RouterLink to="/" class="router-link" active-class="active-nav-link">
        <svg  width="100%" height="100%" viewBox="0 0 23 18" fill="var(--color-text)" :class="{ 'active-nav-icon': $route.path === '/' }" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 15.8125C0 16.6064 0.643591 17.25 1.4375 17.25H21.5625C22.3564 17.25 23 16.6064 23 15.8125C23 15.0186 22.3564 14.375 21.5625 14.375H1.4375C0.643591 14.375 0 15.0186 0 15.8125ZM0 11.0193C0 11.8132 0.643591 12.4568 1.4375 12.4568H21.5625C22.3564 12.4568 23 11.8132 23 11.0193C23 10.2254 22.3564 9.58184 21.5625 9.58184H1.4375C0.643591 9.58184 0 10.2254 0 11.0193ZM0 6.23066C0 7.02457 0.643591 7.66816 1.4375 7.66816H21.5625C22.3564 7.66816 23 7.02457 23 6.23066C23 5.43675 22.3564 4.79316 21.5625 4.79316H1.4375C0.643591 4.79316 0 5.43675 0 6.23066ZM1.4375 0C0.643591 0 0 0.643591 0 1.4375C0 2.23141 0.643591 2.875 1.4375 2.875H21.5625C22.3564 2.875 23 2.23141 23 1.4375C23 0.643591 22.3564 0 21.5625 0H1.4375Z"/>
        </svg>
      </RouterLink>
      <RouterLink to="/cart" class="router-link" active-class="active-nav-link">
        <svg width="100%" height="100%" viewBox="0 0 30 25" fill="var(--color-text)" :class="{ 'active-nav-icon': $route.path === '/cart' }" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.9348 5.63624L26.4457 17.2891C26.1848 18.1189 25.5 18.6722 24.6848 18.6722H11.2174C10.4348 18.6722 9.68478 18.1535 9.42391 17.3928L4.27174 2.76625H1.30435C0.586957 2.76625 0 2.14385 0 1.38313C0 0.622407 0.586957 0 1.30435 0H5.18478C5.73913 0 6.22826 0.38036 6.42391 0.93361L11.7391 15.9059H24.1304L26.9022 6.56985H11.5435C10.8261 6.56985 10.2391 5.94744 10.2391 5.18672C10.2391 4.426 10.8261 3.8036 11.5435 3.8036H28.6957C29.1196 3.8036 29.5109 4.04564 29.7391 4.39142C30 4.73721 30.0652 5.2213 29.9348 5.63624ZM11.8696 20.5048C11.3152 20.5048 10.7609 20.7469 10.3696 21.1618C9.97826 21.5768 9.75 22.1646 9.75 22.7524C9.75 23.3402 9.97826 23.9281 10.3696 24.343C10.7609 24.758 11.3152 25 11.8696 25C12.4239 25 12.9783 24.758 13.3696 24.343C13.7609 23.9281 13.9891 23.3402 13.9891 22.7524C13.9891 22.1646 13.7609 21.5768 13.3696 21.1618C12.9783 20.7469 12.4239 20.5048 11.8696 20.5048ZM23.5761 20.5048C23.0217 20.5048 22.4674 20.7469 22.0761 21.1618C21.6848 21.5768 21.4565 22.1646 21.4565 22.7524C21.4565 23.3402 21.6848 23.9281 22.0761 24.343C22.4674 24.758 23.0217 25 23.5761 25C24.1304 25 24.6848 24.758 25.0761 24.343C25.4674 23.9281 25.6957 23.3402 25.6957 22.7524C25.6957 22.1646 25.4674 21.5768 25.0761 21.1618C24.6848 20.7469 24.1304 20.5048 23.5761 20.5048Z"/>
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Search from "@/components/Search.vue";

let tg = window.Telegram.WebApp;
if(tg.isExpanded===false){
  tg.expand();
}

export default {
  components: {Search},
  computed: {
    searchText: {
      get() {
        return this.$store.state.searchText;
      },
      set(value) {
        this.localSearchText = value;
      },
    },
    isHomePage() {
      return this.$route.path === '/';
    },
  },
  methods:{
    ...mapMutations(['setSearchText']),
  },
  watch:{
    localSearchText(newText) {
      // Вызовите мутацию для установки значения searchText в хранилище
      this.setSearchText(newText);
      // Дополнительные действия, если необходимо
    },
  },
  data() {
    return {
      searchResults: [],
      localSearchText: '',
    };
  },
};
</script>

<style scoped>
.router-link{
  height: 4vh;
  width: 4.1vh;
}

.active-nav-icon {
  fill: var(--color-pink-accent); /* Цвет заливки для активных иконок */
}

.main-content {
  flex: 1; /* Занимает все доступное пространство */
  margin-bottom: 50px; /* Установите высоту вашего навигационного блока */
}

.main-window-search-container input {
  height: 5rex;
  flex: 1; /* Занимает доступное пространство */
  padding: 8px;
  margin-right: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  background: var(--color-pink-dim);
  color: var(--color-input);
}
.search-input::placeholder {
  color: var(--color-pink-accent); /* Цвет placeholder */
  font-weight: bold;
  font-size: 18px;
}

.main-window-template {
  grid-template-rows: 10vh 80vh 10vh;
  align-items: center;
  align-content: center;
}

.main-window-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2vw;
  background-color: var(--color-pink-dim);
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 30px 30px 0px 0px;
}
</style>
