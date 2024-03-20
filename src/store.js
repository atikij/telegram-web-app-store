import { createStore } from 'vuex';
import axios from "@/services/axios.js";

export default createStore({
    state: {
        searchText: '',
        goodsData: {
            unique_categories: [],
            unique_subcategories: [],
            goods_list: [],
        },
    },
    mutations: {
        setSearchText(state, newText) {
            state.searchText = newText;
        },
        setGoodsData(state, payload) {
            state.goodsData = payload;
        },
    },
    actions: {
        async fetchGoodsData({ commit }) {
            try {
                const response = await axios.get('/db');
                commit('setGoodsData', response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        },
    },
    getters:{
        getProduct: state => nameEnglish => {
            return state.goodsData.goods_list.find(product => product.name_english === nameEnglish);
        }

    }
});
