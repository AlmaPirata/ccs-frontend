import axios from "axios";

export const dataModule = {
  state: () => ({
    products: {},
    groups_data: {},
    currencies: {
      usd: 70
    },
    cart: []
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    getGroups(state) {
      return state.groups_data;
    },
    cart(state) {
      return state.cart;
    },
    currencies(state) {
      return state.currencies;
    }
  },
  mutations: {
    setProducts(state, goods) {
      if(!(goods.Error === '' && goods.Success)) return false;
      state.products = goods.Value?.Goods?.map((product) => {
          return {
            'id': product.T,
            'name': state.groups_data[product.G].B[product.T].N,
            'price': product.C,
            'amount': product.P,
            'group_id': product.G
          }
        });
    },
    setGroups(state, groups_data) {
      state.groups_data = groups_data;
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
        const response = await fetch('data.json')
          .then(response => response.json())
          .then(response => commit('setProducts', response));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchNames({commit}) {
      try {
        const response = await fetch('names.json')
          .then(response => response.json())
          .then(response => commit('setGroups', response));
      } catch (e) {
        console.error(e);
      }
    }
  },
  namespaced: true
};