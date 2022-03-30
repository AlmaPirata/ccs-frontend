<template>
    <div v-for="group in groups_data">
        <Panel :header="group.G" :toggleable="true">
            <template slot="header" :header="group.G" :toggleable="true">
                <div>Slot content</div>
            </template>
            <template #icons>
                <button class="p-panel-header-icon p-link mr-2" @click="toggle">
                    <span class="pi pi-cog"></span>
                </button>
                <Menu id="config_menu" ref="menu" :model="items" :popup="true" />
            </template>
            <p>Content</p>
        </Panel>
    </div>
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
    ...mapMutations({

    }),
    ...mapActions({
      fetchNames: 'data/fetchNames',
      fetchGoods: 'data/fetchGoods'
    })
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
    })
  }
}
</script>