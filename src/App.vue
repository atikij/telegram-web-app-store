<template>
  <div class="main-window-template">
    <div class="main-window-search-container">
      <img src="https://wp-club.ru/wp-content/uploads/2023/09/noun_41373.png" alt="search icon" class="search-icon">
      <input type="text" v-model = "searchText" placeholder = "Поиск" class="search-input" />
    </div>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="main-window-navigation">
      <RouterLink to="/" class="nav-item">
        <img src="https://i.pinimg.com/originals/ae/2f/01/ae2f014eb3b1772144de744ce424da6a.png" alt="Home Icon" class="nav-icon" />
      </RouterLink>
      <RouterLink to="/cart" class="nav-item">
        <img src="https://grizly.club/uploads/posts/2022-12/1670822449_grizly-club-p-ikonka-korzina-png-1.png" alt="Home Icon" class="nav-icon" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
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


.search-icon {
  width: 1.5rem; /* Установите нужную ширину */
  //height: 20%; /* Установите нужную высоту */
  margin-right: 10px; /* Установите нужный отступ справа */
  opacity: 0.7; /* Настройте прозрачность, если нужно */
}


.main-content {
  flex: 1; /* Занимает все доступное пространство */
  margin-bottom: 50px; /* Установите высоту вашего навигационного блока */
}

.nav-icon {
  width: 100%; /* Установите желаемую ширину и высоту для иконки */
  height: 24px;
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
  border: 1px solid #ccc;
  border-radius: 5px;
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
  background-color: whitesmoke;
}

.main-window-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}

.nav-item {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  height: 100%;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #ddd;
}
</style>
