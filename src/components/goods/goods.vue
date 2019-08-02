<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav :side="true" :data="goods" :options="scrollOptions" v-if="goods.length">
        <template v-slot:bar="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :current="props.current"
            :labels="props.labels"
            :txts="barTxts"
          >
            <template slot-scope="props">
              <div class="text">
                <supportIco v-show="props.txt.type >= 1" :size="3" :type="props.txt.type"></supportIco>
                <span>{{props.txt.name}}</span>
                <span class="num" v-show="props.txt.count > 0">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
              @click="chooseFood(food)"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">&yen;{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                </div>
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <shopcart
      :selectFoods="selectFoods"
      :shippingFee="data.seller.deliveryPrice"
      :startingFee="data.seller.minPrice"
    ></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import supportIco from "../support-icon/support-icon";
import bubble from "../bubble/bubble";

export default {
  name: "goods",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      choseFood: {},
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    };
  },

  computed: {
    // 获取选中食物的列表
    selectFoods() {
      let selectFoodList = [];
      for (let i = 0; i < this.goods.length; i++) {
        let foods = this.goods[i].foods;
        for (let j = 0; j < foods.length; j++) {
          let food = foods[j];
          if (food.count > 0) {
            selectFoodList.push(food);
          }
        }
      }
      return selectFoodList;
    },

    barTxts() {
      let ret = [];
      for (let i = 0; i < this.goods.length; i++) {
        const { type, name } = this.goods[i];
        let foods = this.goods[i].foods;
        let count = 0;
        for (let j = 0; j < foods.length; j++) {
          let food = foods[j];
          if (food.count > 0) {
            count += food.count;
          }
        }
        ret.push({
          type,
          name,
          count
        });
      }
      return ret;
    }
  },

  methods: {
    fetch() {
      this.axios
        //.get("http://moxinhuo.easy.echosite.cn/static/data.json")
        .get("/api/goods")
        .then(response => {
          this.goods = response.data.data;
          this.$nextTick(() => {
            this._initGoodsData();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 选择展示详细信息的food
    chooseFood(food) {
      this.choseFood = food;
      this.$createFood({
        $props: {
          food: "choseFood"
        }
      }).show();
    },

    // 为每个food对象增加一个count字段属性
    _initGoodsData() {
      for (let i = 0; i < this.goods.length; i++) {
        for (let j = 0; j < this.goods[i].foods.length; j++) {
          this.$set(this.goods[i].foods[j], "count", 0);
        }
      }
    }
  },
  components: {
    shopcart: shopcart,
    cartcontrol: cartcontrol,
    supportIco: supportIco,
    bubble: bubble
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.goods {
  position: relative;
  text-align: left;
  height: 100%;

  .scroll-nav-wrapper {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0;
    bottom: 48px;

    .text {
      flex: 1;
      position: relative;

      .num {
        position: absolute;
        right: -8px;
        top: -10px;
      }

      .support-ico {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
      }
    }

    .food-item {
      padding: 18px;
      display: flex;
      position: relative;
      border-1px(rgba(7, 17, 27, 0.1));

      &.last-child {
        border-none();
      }

      .icon {
        flex: 0 0 57px;
        display: inline-block;
        vertical-align: top;
      }

      .content {
        display: inline-block;
        flex: 1;
        vertical-align: top;
        margin-top: 2px;
        margin-left: 10px;

        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 14px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .desc {
        }

        .extra {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 14px;
          margin-bottom: 8px;

          .count {
            margin-right: 12px;
          }
        }

        .price {
          display: inline-block;

          .now {
            font-size: 14px;
            color: rgb(240, 20, 20);
            font-weight: normal;
            line-height: 24px;
            margin-right: 8px;
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            font-weight: normal;
            color: rgb(147, 153, 159);
          }
        }

        .cart-button-wrapper {
          display: inline-block;
          position: absolute;
          right: 18px;
        }
      }
    }
  }

  >>> .cube-scroll-nav-bar-items {
    width: 80px;
    white-space: normal;
  }

  >>> .cube-scroll-nav-bar-item {
    padding: 0 10px;
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 14px;
    font-size: $fontsize-small;
    background: $color-background-ssss;

    &.cube-scroll-nav-bar-item_active {
      font-weight: 700;
      background: #fff;
    }
  }

  >>> .cube-scroll-nav-panel-title {
    padding-left: 14px;
    background: #f3f5f7;
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 26px;
    border-left: 2px solid #d9dde1;
  }
}
</style>