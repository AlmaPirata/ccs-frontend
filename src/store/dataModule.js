import axios from "axios";

export const goodsModule = {
  state: () => ({
    goodsByGroups: {},
    names: {},
    currencies: {
      usd: 70
    },
    cart: []
  }),
  getters: {
    goodsByGroups(state) {
      return state.goodsByGroups;
    },
    cart(state) {
      return state.cart;
    },
    currencies(state) {
      return state.currencies;
    }
  },
  mutations: {
    setGoods(state, goods) {
      state.goodsByGroups = goods;
    },
    setNames(state, names) {
      state.names = names;
    },
    setCurrencies(state, currency) {
      state.currencies.usd = currency;
    },
    setCart(state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    async fetchGoods({commit}) {
      try {
        const response = await axios
          .get('@/api/data.json')
          .then(response => response.json())
          .then(response => commit('setGoods', response));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchNames({commit}) {
      try {
        const response = await axios
          .get('@/api/names.json')
          .then(response => response.json())
          .then(response => commit('setNames', response));
      } catch (e) {
        console.error(e);
      }
    }
  }
};