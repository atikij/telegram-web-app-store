<template>
  <div class="main-window-template">
    <div v-if="isHomePage" class="main-window-search-container">
      <img src="https://i.pinimg.com/originals/cd/ab/85/cdab85a392e92623afa27de32443379f.png" alt="search icon" class="search-icon">
      <input type="text" v-model = "searchText" placeholder = "Поиск" class="search-input"/>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="main-window-navigation">
      <RouterLink to="/" class="">
        <img src="https://i.pinimg.com/originals/ae/2f/01/ae2f014eb3b1772144de744ce424da6a.png" alt="Home Icon" class="nav-icon" />
      </RouterLink>
      <RouterLink to="/cart" class="">
        <img src="https://grizly.club/uploads/posts/2022-12/1670822449_grizly-club-p-ikonka-korzina-png-1.png" alt="Home Icon" class="nav-icon" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {useWebApp} from "vue-tg";

let tg = window.Telegram.WebApp;
if(tg.isExpanded===false){
  tg.expand();
}
Telegram.WebApp.onEvent('themeChanged', function(){
  if (tg.colorScheme === 'light') {
    document.querySelector('.search-icon').src = 'https://i.pinimg.com/originals/cd/ab/85/cdab85a392e92623afa27de32443379f.png';
  } else if (tg.colorScheme === 'dark') {
    document.querySelector('.search-icon').src = 'https://www.tp.edu.sg/etc.clientlibs/tp-web/clientlibs/clientlib-site/resources/images/search-icon.png';
  }
});
export default {
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
    updateSearchIcon() {
      if (tg.colorScheme === 'light') {
        document.querySelector('.search-icon').src = 'https://i.pinimg.com/originals/cd/ab/85/cdab85a392e92623afa27de32443379f.png';
      } else if (tg.colorScheme === 'dark') {
        document.querySelector('.search-icon').src = 'https://www.tp.edu.sg/etc.clientlibs/tp-web/clientlibs/clientlib-site/resources/images/search-icon.png';
      }
    }
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
  created() {
    this.updateSearchIcon();
  },
  updated() {
    this.updateSearchIcon();
  },
  mounted() {
    this.updateSearchIcon();
  }
};
</script>


<style scoped>
.search-icon {
  width: 1.5rem; /* Установите нужную ширину */
  //height: 20%; /* Установите нужную высоту */
  margin-right: 10px; /* Установите нужный отступ справа */
}

.main-content {
  flex: 1; /* Занимает все доступное пространство */
  margin-bottom: 50px; /* Установите высоту вашего навигационного блока */
}

.nav-icon {
  width: 4vh; /* Установите желаемую ширину и высоту для иконки */
  height: 4vh;
}

.main-window-search-container {
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}

.main-window-search-container input {
  height: 5rex;
  flex: 1; /* Занимает доступное пространство */
  padding: 8px;
  margin-right: 10px;
  border: 2px solid var(--tg-theme-text-color);
  border-radius: 5px;
  background: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
}
.search-input::placeholder {
  color: var(--tg-theme-text-color); /* Цвет placeholder */
}

.main-window-search-container button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.main-window-template {
  grid-template-rows: 10vh 80vh 10vh;
  align-items: center;
  align-content: center;
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-bg-color);
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
  background-color: #f5f5f5;
  //border-top: 1px solid #ddd;
}

.nav-item {
  text-decoration: none;
  color: #333;
  //padding: 5px 10px;
  border-radius: 5px;
  height: 100%;
  transition: background-color 0.3s;
}

.nav-item:active {
  background-color: #ddd;
}
</style>
