<template>
    <div class="container">
        <div>
            <label for="current-currency">Курс доллара:</label>
            <input type="range"
                   id="current-currency"
                   class="current-currency"
                   min="20" max="80"
                   v-model="selectedCurrency"
            >
            <span :class="[`diff-${differenceCurrency}`]">
                {{ currencies.usd }}
            </span>
        </div>
        <hr>
        <Panel :header="group.G"
               :toggleable="true"
               v-for="(group, i) in groups_data"
               :key="i"
               class="panel"
        >
            <template #header></template>
            <div class="book-wrapper"
                 v-if="getProductsInGroup(i).length > 0">
                <div class="book-item"
                     v-for="book in getProductsInGroup(i)"
                     :key="book.id">
                    <div class="book-title">{{ book.name }} ({{ book.amount }})</div>
                    <div class="book-price" @click="addItem(book)">{{ formatedPrice(book.price) }} ₽</div>
                </div>
            </div>
            <div v-else>
                В данной группе нет товаров
            </div>
        </Panel>
        <hr>
        <Cart>
            <template v-if="cart.length > 0">
                <tr v-for="item in cart">
                    <td>{{ item.name }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ totalSum(item.price, item.amount) }} ₽</td>
                    <td @click="removeItem(item.id)"
                        class="remove-from-cart"
                    >Удалить</td>
                </tr>
                <tr>
                    <td>
                        <Button label="Очистить корзину"
                                class="clear-cart p-button-secondary"
                                @click="clearCart"
                        />
                    </td>
                </tr>
            </template>
        </Cart>
    </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
  import Panel from "primevue/panel";
  import Button from 'primevue/button';
  import Cart from "./components/Cart";

  const DIFFERENCE_VALUES = {
    higher: 'higher',
    lower: 'lower',
    equal: 'equal'
  };

  export default {
    components: {
      Panel,
      Cart,
      Button
    },
    data() {
      return {
        differenceCurrency: 'equal',
        differenceCurrencyTimeout: null,
      };
    },
    methods: {
      ...mapActions({
        fetchNames: "data/fetchNames",
        fetchGoods: "data/fetchGoods",
        addItem: "data/addCartItem",
        removeItem: "data/removeCartItem",
        clearCart: "data/removeAllCartItems",
        updateCurrency: "data/updateCurrency"
      }),
      getProductsInGroup(groupId) {
        return this.products.filter(
          (p) => p.group_id === +groupId
        );
      },
      formatedPrice(price) {
        return Math.floor((price * this.currencies.usd)*100)/100;
      },
      totalSum(price, amount) {
        return Math.floor((this.formatedPrice(price) * amount)*100)/100;
      }
    },
    mounted() {
      this.fetchNames();
      this.fetchGoods();
    },
    computed: {
      ...mapState({
        products: (state) => state.data.products,
        groups_data: (state) => state.data.groups_data,
        currencies: (state) => state.data.currencies,
        cart: (state) => state.data.cart
      }),
      selectedCurrency: {
        get () {
          return this.currencies.usd
        },
        set (newCurrency) {
          clearTimeout(this.differenceCurrencyTimeout);

          if(this.currencies.usd > newCurrency) {
            this.differenceCurrency = DIFFERENCE_VALUES.higher;
          } else if(this.currencies.usd < newCurrency) {
            this.differenceCurrency = DIFFERENCE_VALUES.lower;
          } else {
            this.differenceCurrency = DIFFERENCE_VALUES.equal;
          }
          this.differenceCurrencyTimeout = setTimeout(() => {this.differenceCurrency = DIFFERENCE_VALUES.equal}, 2500);

          this.updateCurrency(newCurrency)
        }
      }
    },
  };
</script>

<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
    }
    .panel {
        width: 50%;
        box-sizing: border-box;
        padding: 5px;
    }
    .book-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
    .book-item {
        width: 50%;
        display: flex;
        flex-grow: 1;
        box-sizing: border-box;
        border: 1px solid black;
    }
    .book-title {
        padding: 10px;
        width: 100%;
    }
    .book-price {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100px;
        min-width: 100px;
        padding: 10px;
        background-color: #cccccc;
        font-weight: bold;
        cursor: pointer;
    }
    hr {
        width: 100%;
    }
    .cart td {
        padding-right: 5px;
    }
    .clear-cart {
        font-size: 14px;
        padding: 5px 10px;
    }
    .remove-from-cart {
        cursor: pointer;
    }
    .current-currency {
        margin-left: 10px;
    }
    .diff-higher {
        background-color: red;
    }
    .diff-lower {
        background-color: green;
    }
</style>