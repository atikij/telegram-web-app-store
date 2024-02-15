// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        searchText: '',
    },
    mutations: {
        setSearchText(state, newText) {
            state.searchText = newText;
        },
    },
});
