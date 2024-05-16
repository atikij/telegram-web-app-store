<template>
  <div class="main-window-template">
    <div v-if="isHomePage" class="main-window-search-container">
      <svg width="25" height="25" fill="var(--color-pink-accent)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15 15" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
      <input type="text" v-model = "searchText" placeholder = "Поиск" class="search-input"/>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="main-window-navigation">
      <RouterLink to="/" class="" active-class="active-nav-link">
        <svg width="4vh" height="4vh" fill="var(--color-text)" :class="{ 'active-nav-icon': $route.path === '/' }" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 22 22"  xml:space="preserve">
          <path  d="M21.262,9.628c-3.39-2.854-9.546-8.171-9.607-8.225L11,0.84l-0.652,0.563
            c-0.062,0.053-6.221,5.368-9.66,8.248C0.25,10.045,0,10.596,0,11.16c0,1.104,0.896,2,2,2h1v6c0,1.104,0.896,2,2,2h3h9
            c1.104,0,2-0.896,2-2v-6h1c1.104,0,2-0.896,2-2C22,10.562,21.725,9.999,21.262,9.628z M13,19.16H9v-5h4V19.16z M17,11.16l0.002,8
            c-0.002,0-3.002,0-3.002,0v-6H8v6H5v-8H1.999C4.764,8.848,9.314,4.933,11,3.48c1.686,1.453,6.234,5.367,9,7.681
            C20,11.161,17,11.161,17,11.16z"/>
        </svg>
      </RouterLink>
      <RouterLink to="/cart" class="">
        <svg width="4vh" height="4vh" fill="var(--color-text)" :class="{ 'active-nav-icon': $route.path === '/cart' }" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/><path d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/><path d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/><path d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/></g></svg>      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

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
        //document.documentElement.classList.toggle('dark-theme');
      } else if (tg.colorScheme === 'dark') {
        //document.documentElement.classList.toggle('dark-theme');
      }
    },
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
.active-nav-icon {
  fill: var(--color-pink-accent); /* Цвет заливки для активных иконок */
}

.main-content {
  flex: 1; /* Занимает все доступное пространство */
  margin-bottom: 50px; /* Установите высоту вашего навигационного блока */
}

.main-window-search-container {
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  margin: 15px 5px 5px 5px;
  background: var(--color-pink-dim);
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
  background-color: var(--color-background);
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
