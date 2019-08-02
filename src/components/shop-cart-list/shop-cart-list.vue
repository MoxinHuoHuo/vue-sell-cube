<template>
  <cube-popup
    v-show="visible && isTotalCountMoreThanZero"
    :maskClosable="true"
    :zIndex="90"
    position="bottom"
    type="shop-cart-list"
    @mask-click="maskClick"
  >
    <div v-show="visible">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="emptyCart">清空</span>
      </div>
      <cube-scroll ref="listContent">
        <ul class="list-content">
          <li class="food" v-for="food in selectFoods" :key="food.name">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price * food.count}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </cube-popup>
</template>

<script type="text/ecmascript-6">
import cartcontrol from "../cartcontrol/cartcontrol";

const EVENT_HIDE = "hide";

export default {
  name: "shop-cart-list",

  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    totalFoodCount: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      visible: false
    };
  },
  computed: {
    isTotalCountMoreThanZero() {
      if (this.totalFoodCount > 0) {
        this.show();
        return true;
      } else {
        this.hide();
        return false;
      }
    }
  },
  methods: {
    emptyCart() {
      for (let i = 0; i < this.selectFoods.length; i++) {
        let food = this.selectFoods[i];
        food.count = 0;
      }
      this.hide();
    },

    show() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.listContent.refresh();
      });
    },

    hide() {
      this.visible = false;
      this.$emit(EVENT_HIDE);
    },

    maskClick() {
      this.hide();
    }
  },

  components: {
    cartcontrol: cartcontrol
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cube-shop-cart-list {
  bottom: 48px;

  .list-header {
    height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .title {
      display: inline-block;
      font-size: 14px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      float: left;
    }

    .empty {
      display: inline-block;
      float: right;
      font-size: 12px;
      font-weight: 200;
      color: rgb(0, 160, 220);
    }
  }

  .cube-scroll-wrapper {
    max-height: 192px;
    background: #fff;

    .list-content {
      padding: 0 18px;
      background: #fff;

      .food {
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        height: 24px;
        padding: 12px 0;
        position: relative;
        line-height: 24px;

        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          display: inline-block;
        }

        .price {
          display: inline-block;
          position: absolute;
          right: 84px;
          color: rgb(240, 20, 20);
          font-size: 14px;
          font-weight: 700;
        }

        .cart-control-wrapper {
          display: inline-block;
          position: absolute;
          right: 0px;
          height: 24px;
        }
      }
    }
  }
}
</style>