<template>
  <div id="app">
    <v-header :shangjia="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import header from "./components/v-header/header";
import tab from "./components/tab/tab";
import Goods from "./components/goods/goods";
import Ratings from "./components/ratings/ratings";
import Seller from "./components/seller/seller";
import { debuglog } from "util";

export default {
  name: "app",
  data() {
    return {
      seller: {},
      // tabs: [
      //   { label: "商品", component: Goods, data: { seller: this.seller } },
      //   { label: "评价", component: Ratings, data: { seller: this.seller } },
      //   { label: "商家", component: Seller, data: { seller: this.seller } }
      // ]
    };
  },
  computed: {
    tabs() {
      return [
        { label: "商品", component: Goods, data: { seller: this.seller } },
        { label: "评价", component: Ratings, data: { seller: this.seller } },
        { label: "商家", component: Seller, data: { seller: this.seller } }
      ];
    }
  },
  created() {
    this.getDataFromServe();
  },
  methods: {
    getDataFromServe() {
      // var that = this;
      this.axios
        //.get("http://moxinhuo.easy.echosite.cn/static/data.json")
        .get("/api/seller")
        .then(response => {
          console.log(response);
          this.seller = response.data.data;
          console.log(this.seller);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    "v-header": header,
    tab: tab,
    Goods: Goods,
    Seller: Seller,
    Ratings: Ratings
  }
};
</script>
<style lang="stylus">
#app {
  .tab-wrapper {
    position: fixed;
    top: 136px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
