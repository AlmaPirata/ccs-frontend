<template>

</template>

<script>
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import Panel from 'primevue/panel';

  export default {
    components: {
      Panel
    },
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {
      this.fetchNames();
      this.fetchGoods();
    },
    computed: {
      ...mapState({
        products: state => state.data.products,
        groups_data: state => state.data.groups_data,
        currencies: state => state.data.currencies,
        cart: state => state.data.cart
      }),
      ...mapGetters({
        getProducts: 'data/getProducts',
        getGroups: 'data/getGroups'
      }),
      price() {
        return this.product * this.currencies
      }
    }
  }
</script>