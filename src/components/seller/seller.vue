<template>
  <div class="seller">
    <cube-scroll :options="sellerScrollOptions">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{data.seller.name}}</h1>
          <div class="desc">
            <star :size="36" :score="data.seller.serviceScore"></star>
            <span class="rating-count">(评论总数{{data.seller.ratingCount}})</span>
            <span class="sell-count">月售{{data.seller.sellCount}}单</span>
          </div>
          <div class="info">
            <div class="min-price">
              <div class="text">起送价</div>
              <div class="price">
                <span class="number">{{data.seller.minPrice}}</span>
                <span class="unit">元</span>
              </div>
            </div>
            <div class="delivery-price">
              <div class="text">配送费</div>
              <div class="price">
                <span class="number">{{data.seller.deliveryPrice}}</span>
                <span class="unit">元</span>
              </div>
            </div>
            <div class="delivery-time">
              <div class="text">平均配送时间</div>
              <div class="time">
                <span class="number">{{data.seller.deliveryTime}}</span>
                <span class="unit">分钟</span>
              </div>
            </div>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <p class="text">{{data.seller.bulletin}}</p>
          <div class="supports-wrapper">
            <ul>
              <li
                v-for="(support, index) in data.seller.supports"
                :key="index"
                class="support-item"
              >
                <supportIcon :size="4" :type="support.type"></supportIcon>
                <span class="description">{{ support.description }}</span>
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景图</h1>
          <cube-scroll
            ref="picScroll"
            :data="items"
            direction="horizontal"
            class="horizontal-scroll-list-wrap"
            :options="picScrollOptions"
          >
            <ul class="pic-list">
              <li class="pic-item" v-for="(item, index) in picItemArray" :key="index">
                <img :src="item" width="120px" height="90px" />
              </li>
            </ul>
          </cube-scroll>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商家信息</h1>
          <ul>
            <li v-for="(info,index) in data.seller.infos" :key="index" class="info-item">
              <span class="text">{{info}}</span>
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import supportIcon from "../support-icon/support-icon";
import star from "../star/star";
import split from "../split/split";

export default {
  name: "ratings",
  props: {
    data: {
      type: Object
    }
  },

  data() {
    return {
      sellerScrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      picScrollOptions: {
        stopPropagation: true,
        directionLockThreshold: 0
      },
      items: []
    };
  },

  computed: {
    picItemArray() {
      this.items = this.data.seller.pics;
      return this.items;
    }
  },

  methods: {},

  components: {
    supportIcon: supportIcon,
    star: star,
    split: split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl';

.seller {
  position: relative;
  height: 100%;
  width: 100%;

  .seller-content {
    .overview {
      padding: 18px;
      font-size: 0;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: 700;
      }

      .desc {
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(147, 153, 159, 0.2);

        .star {
          display: inline-block;
          margin-right: 8px;
        }

        .rating-count {
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
          margin-right: 12px;
        }

        .sell-count {
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
        }
      }

      .info {
        display: flex;
        padding-top: 18px;

        .min-price {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(47, 153, 159, 0.2);

          .text {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            margin-bottom: 4px;
          }

          .price {
            .number {
              font-size: 24px;
              font-weight: 600;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }

            .unit {
              font-size: 10px;
              font-weight: 200;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }
          }
        }

        .delivery-price {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(47, 153, 159, 0.2);

          .text {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            margin-bottom: 4px;
          }

          .price {
            .number {
              font-size: 24px;
              font-weight: 600;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }

            .unit {
              font-size: 10px;
              font-weight: 200;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }
          }
        }

        .delivery-time {
          flex: 1;
          text-align: center;

          .text {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            margin-bottom: 4px;
          }

          .time {
            .number {
              font-size: 24px;
              font-weight: 600;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }

            .unit {
              font-size: 10px;
              font-weight: 200;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }
          }
        }
      }
    }

    .bulletin {
      padding: 18px 18px 0px 18px;

      .title {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        font-weight: 600;
      }

      .text {
        padding: 0 12px 16px 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 24px;
        font-weight: 200;
        white-space: normal;
      }

      .supports-wrapper {
        .support-item {
          border-top: 1px solid rgba(47, 153, 159, 0.2);
          padding: 16px 12px;

          .support-ico {
            margin-right: 6px;
          }

          .description {
            display: inline-block;
            vertical-align: top;
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 14px;
          }
        }
      }
    }

    .pics {
      padding: 18px;

      .title {
        margin-bottom: 12px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        font-weight: 600;
      }

      .horizontal-scroll-list-wrap {
        .cube-scroll-content {
          display: inline-block;
        }

        .pic-list {
          white-space: nowrap;

          .pic-item {
            margin-right: 6px;
            display: inline-block;
          }
        }
      }
    }

    .info {
      padding: 18px 18px 0 18px;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        font-weight: 600;
        margin-bottom: 12px;
      }

      .info-item {
        padding: 16px 12px;
        border-top: 1px solid rgba(47, 153, 159, 0.2);

        .text {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 16px;
        }
      }
    }
  }
}
</style>