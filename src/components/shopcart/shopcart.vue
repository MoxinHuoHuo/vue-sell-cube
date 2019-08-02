<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{'high-light':totalFoodCount > 0}">
            <i class="iconfont icon-gouwuchekong" :class="{'high-light':totalFoodCount > 0}"></i>
          </div>
          <div v-show="totalFoodCount > 0" class="food-sum">
            <bubble :num="totalFoodCount"></bubble>
          </div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">配送费&yen;{{shippingFee}}</div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay-none" v-if="totalPrice <= 0">&yen;{{startingFee}}起送</div>
        <div
          class="pay-part"
          v-if="totalPrice < startingFee && totalPrice > 0"
        >还差&yen;{{startingFee-totalPrice}}起送</div>
        <div class="pay-over" v-if="totalPrice >= startingFee">去结算</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from "../cartcontrol/cartcontrol";
import bubble from "../bubble/bubble";

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    startingFee: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      // 商品列表是否折叠起来
      listFold: true
    };
  },

  computed: {
    totalPrice() {
      let totalPrice = 0;
      for (let i = 0; i < this.selectFoods.length; i++) {
        let food = this.selectFoods[i];
        totalPrice += food.price * food.count;
      }
      return totalPrice;
    },
    totalFoodCount() {
      let totalCount = 0;
      for (let i = 0; i < this.selectFoods.length; i++) {
        let food = this.selectFoods[i];
        totalCount += food.count;
      }
      if (totalCount === 0) {
        this.isOpen = false;
      }
      return totalCount;
    }
  },

  methods: {
    toggleList() {
      if (this.listFold) {
        if (!this.totalFoodCount) {
          return;
        }
        this.listFold = false;
        this._showShopCartList();
      } else {
        this.listFold = true;
        this._hideShopCartList();
      }
    },

    _showShopCartList() {
      this.shopCartListComp =
        this.shopCartListComp ||
        this.$createShopCartList({
          $props: {
            selectFoods: "selectFoods",
            totalFoodCount: "totalFoodCount"
          },
          $events: {
            hide: () => {
              this.listFold = true;
            }
          }
        });
      this.shopCartListComp.show();
    },

    // _showShopCartList() {
    //   this.$refs.shopcartlist.show();
    // },

    _hideShopCartList() {
      this.shopCartListComp.hide();
    },

    // _hideShopCartList() {
    //   this.$refs.shopcartlist.hide();
    // },

    pay() {
      if (this.totalPrice < this.startingFee) {
        return;
      }
      // window.alert(`支付${this.totalPrice}元`);
      this.$createDialog({
        type: "confirm",
        title: "支付金额",
        content: `${this.totalPrice}`,
        confirmBtn: {
          text: "确定支付",
          active: true
        },
        cancelBtn: {
          text: "取消支付",
          active: false
        },
        onConfirm: () => {
          window.alert(`支付${this.totalPrice}元`);
        }
      }).show();
    }
  },

  components: {
    cartcontrol: cartcontrol,
    bubble: bubble
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url('//at.alicdn.com/t/font_1279978_7b4z630u4bj.css');
@import '~@/common/stylus/mixin.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  width: 33.35%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
        z-index: 60;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343C;
          text-align: center;

          &.high-light {
            background-color: rgb(0, 160, 220);
          }

          .icon-gouwuchekong {
            font-size: 24px;
            color: #80858a;
            line-height: 44px;

            &.high-light {
              color: rgb(255, 255, 255);
            }
          }
        }

        .food-sum {
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }

      .price {
        display: inline-block;
        padding: 12px 12px 12px 0;
        box-sizing: border-box;
        vertical-align: top;
        font-size: 16px;
        color: #80858a;
        font-weight: 700;
        line-height: 22px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }

      .desc {
        display: inline-block;
        margin-left: 12px;
        line-height: 48px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 300;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay-none {
        line-height: 48px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;
      }

      .pay-part {
        line-height: 48px;
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;
      }

      .pay-over {
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: rgb(255, 255, 255);
        background-color: rgba(0, 238, 143, 0.7);
      }
    }
  }
}
</style>
