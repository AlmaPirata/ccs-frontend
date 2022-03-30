import {createStore} from "vuex";
import {dataModule} from "@/store/dataModule";

export default createStore({
  modules: {
    data: dataModule
  }
});