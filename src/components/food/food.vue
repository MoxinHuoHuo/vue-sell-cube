<template>
  <transition name="move">
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" width="100%" height="100%" />
            <div class="back" @click="hide">
              <i class="iconfont icon-close-circle"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="food-name">{{food.name}}</h1>
            <div class="food-sell-info">
              <span class="food-sell-count">月售{{food.sellCount}}</span>
              <span class="food-rating">好评率{{food.rating}}</span>
            </div>
            <div class="food-price">
              <span class="new-price">&yen;{{food.price}}</span>
              <span class="old-price" v-show="food.oldPrice != '' ">&yen;{{food.oldPrice}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="enterCartMove">
              <div class="enter-gouwuche" v-show="food.count <= 0" @click="enterShopCart">加入购物车</div>
            </transition>
          </div>
          <split></split>
          <div class="food-introduction">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <ratingselect
            v-on:only-content="onlyContent"
            v-on:select-type="selectType"
            ref="ratingSelect"
            :ratings="food.ratings"
          ></ratingselect>
          <div class="ratings-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                v-show="isNeedToShow(rating)"
                v-for="(rating, index) in food.ratings"
                :key="index"
                class="rating-item"
              >
                <div class="user">
                  <span class="rate-time">{{ format(rating.rateTime) }}</span>
                  <span class="username">{{ rating.username }}</span>
                  <img class="avatar" :src="rating.avatar" width="24px" height="24px" />
                </div>
                <div class="rating-text">
                  <i
                    class="iconfont"
                    :class="{'icon-dianzan':rating.rateType === 0,'icon-cai':rating.rateType === 1}"
                  ></i>
                  <span class="text" v-show="rating.text !=''">{{rating.text}}</span>
                  <span class="text" v-show="rating.text ===''">这位客人没有发表评论内容</span>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">该商品暂无评价！</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from "../cartcontrol/cartcontrol";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import moment from "moment";

const POSITIVE = 0;
const NEGOTIVE = 1;
const ALL = 2;

export default {
  name: "food",
  props: {
    food: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      visible: false,
      // 评论要显示的评论类型
      ratingType: ALL,
      // 筛选有无论评内容展示
      isOnlyContent: false
    };
  },

  methods: {
    enterShopCart() {
      this.food.count++;
    },

    show() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },

    hide() {
      this.visible = false;
      this.$refs["ratingSelect"].initStatus();
    },

    isNeedToShow(rating) {
      if (this.isOnlyContent === true && rating.text === "") {
        return false;
      }
      if (this.ratingType === ALL) {
        return true;
      } else {
        return rating.rateType === this.ratingType;
      }
    },

    // 绑定ratingselect组件的select-type属性，如果该属性被赋值，则调用该方法
    selectType(selectType) {
      this.ratingType = selectType;
    },

    // 绑定组件的only-content属性
    onlyContent(onlyContent) {
      this.isOnlyContent = onlyContent;
    },

    // 格式化时间用的
    format(time) {
      return moment().format("YYYY-MM-DD, h:mm:ss");
    }
  },

  components: {
    split: split,
    cartcontrol: cartcontrol,
    ratingselect: ratingselect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url('//at.alicdn.com/t/font_1279978_0450jmbmp0ga.css');
@import '~@/common/stylus/mixin.styl';

.food {
  position: fixed;
  width: 100%;
  bottom: 48px;
  top: 0px;
  background: rgb(255, 255, 255);

  &.move-enter-active, &.move-leave-active {
    transition: all 0.3s linear;
  }

  &.move-enter, &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .food-content {
    position: relative;
    width: 100%;

    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;

      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }

      .icon-close-circle {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 24px;
        color: #808080;
        z-index: 5;
      }
    }

    .content {
      padding: 18px;
      position: relative;

      .food-name {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }

      .food-sell-info {
        color: rgb(147, 153, 159);
        margin-bottom: 18px;
        font-size: 0px;

        .food-sell-count {
          font-size: 10px;
          margin-right: 12px;
        }

        .food-rating {
          font-size: 10px;
        }
      }

      .food-price {
        line-height: 24px;
        font-size: 0px;
        display: inline-block;

        .new-price {
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          margin-right: 12px;
        }

        .old-price {
          font-size: 10px;
          font-weight: 700;
          text-decoration: line-through;
          color: rgb(147, 153, 159);
        }
      }

      .cart-control-wrapper {
        display: inline-block;
        position: absolute;
        right: 18px;
      }

      .enter-gouwuche {
        display: inline-block;
        position: absolute;
        right: 18px;
        padding: 0 12px;
        width: 60px;
        font-size: 10px;
        line-height: 24px;
        background: rgb(0, 160, 220);
        color: rgb(255, 255, 255);
        border-radius: 24px;

        &.enterCartMove-enter-active {
          transition: all 0.3s ease;
        }

        &.enterCartMove-leave-active {
          transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
        }

        &.enterCartMove-enter, &.enterCartMove-leave-to {
          transform: translateX(10px);
          opacity: 0;
        }
      }
    }

    .food-introduction {
      padding: 18px;

      .title {
        font-size: 14px;
        font-weight: 600;
        color: rgb(7, 17, 27);
      }

      .text {
        margin: 6px 8px 0 8px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77, 85, 93);
      }
    }

    .ratings-wrapper {
      margin: 0 18px;

      .rating-item {
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.2);
        padding: 16px 0;

        .user {
          margin-bottom: 6px;
          position: relative;

          .rate-time {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 24px;
          }

          .username {
            position: absolute;
            font-size: 10px;
            right: 36px;
            color: rgb(147, 153, 159);
            line-height: 24px;
            margin-right: 6px;
          }

          .avatar {
            position: absolute;
            line-height: 24px;
            right: 5px;
          }
        }

        .rating-text {

          .iconfont {
            font-size: 12px;
            line-height: 24px;
            margin-right: 4px;

            &.icon-dianzan {
              color: rgb(0, 160, 220);
            }

            &.icon-cai {
              color: rgb(147, 153, 159);
            }
          }

          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 16px;
          }
        }
      }

      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 16px;
      }
    }
  }
}
</style>
