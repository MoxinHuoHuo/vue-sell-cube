<template>
  <div class="cart-button-wrapper">
    <transition name="move">
      <div class="descrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
        <i class="inner iconfont icon-icon_roundreduce"></i>
      </div>
    </transition>
    <transition class="movecount">
      <div class="count" v-show="food.count >= 0">{{food.count==0?'':food.count}}</div>
    </transition>
    <div class="increase" @click.stop.prevent="addCart($event)">
      <i class="iconfont icon-icon_roundadd"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    //this.$set(this.food, "count", 0);
  },
  methods: {
    addCart(event) {
      this.food.count++;
      // 获取class="icon-icon_roundadd"的dom节点，存储在key为cart-add属性中
      this.$emit("cart-add", event.target);
    },
    decreaseCart() {
      this.food.count--;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url('//at.alicdn.com/t/font_1279978_7b4z630u4bj.css');

.cart-button-wrapper {
  font-size: 0;

  .descrease {
    display: inline-block;
    position: relative;
    vertical-align: top;

    .icon-icon_roundreduce {
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }

    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear;
    }

    &.move-enter {
      opacity: 0;
      transform: translate3d(48px, 0, 0) rotate(180deg);
    }

    &.move-enter-to {
      opacity: 1;
    }

    &.move-leave {
      opacity: 1;
    }

    &.move-leave-to {
      opacity: 0;
      transform: translate3d(48px, 0, 0) rotate(180deg);
    }
  }

  .count {
    vertical-align: top;
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    width: 24px;
    text-align: center;

    &.movecount-enter-active, &.movecount-leave-active {
      transition: all 0.5s linear;
    }

    &.movecount-enter, &.movecount-leave-to {
      opacity: 0;
      transform: translate3d(12px, 0, 0) rotate(180deg);
    }

    &.movecount-enter-to {
      opacity: 1;
    }

    &.movecount-leave {
      opacity: 1;
    }
  }

  .increase {
    display: inline-block;
    vertical-align: top;

    .icon-icon_roundadd {
      font-size: 24px;
      color: rgb(0, 160, 220);
      line-height: 24px;
    }
  }
}
</style>
