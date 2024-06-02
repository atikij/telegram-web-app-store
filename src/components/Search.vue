<template>
  <div v-if="isHomePage" class="main-window-search-container">
    <input type="text" v-model = "searchText" placeholder = "Поиск" class="search-input"/>
    <svg style="margin-right: 10px" width="25" height="25" fill="var(--vt-c-pink-bright)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15 15" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
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
.main-window-search-container {
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  margin: 0px 5px 5px 5px;
  background: var(--vt-c-white);
  width: 90%;
  box-shadow: 0px 6px 15.4px 0px #00000040;
}

.main-window-search-container input {
  height: 5rex;
  flex: 1; /* Занимает доступное пространство */
  padding: 8px;
  outline: none;
  border: none;
  border-radius: 5px;
  background: var(--vt-c-white);
  color: var(--color-input);
}
.search-input::placeholder {
  color: #958F92; /* Цвет placeholder */
  font-size: 13px;
}

</style>
