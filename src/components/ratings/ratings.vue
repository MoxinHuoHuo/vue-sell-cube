<template>
  <div class="ratings">
    <cube-scroll :options="scrollOptions">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <div class="score">{{data.seller.score}}</div>
            <div class="text">综合评分</div>
            <div class="rank-rate">高于周边商家{{data.seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="text">服务态度</span>
              <div class="star-wrapper">
                <star :size="36" :score="data.seller.serviceScore"></star>
              </div>
              <span class="service-score">{{data.seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="text">服务态度</span>
              <div class="star-wrapper">
                <star :size="36" :score="data.seller.serviceScore"></star>
              </div>
              <span class="service-score">{{data.seller.serviceScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="text">送达时间</span>
              <span class="delivery-time">{{data.seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect
          v-on:only-content="onlyContent"
          v-on:select-type="selectType"
          ref="ratingSelect"
          :ratings="ratings"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="ratings && ratings.length">
            <li
              v-show="isNeedToShow(rating)"
              v-for="(rating, index) in ratings"
              :key="index"
              class="rating-item"
            >
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar" />
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span
                    class="delivery"
                    v-show="rating.deliveryTime != ''"
                  >{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text" v-show="rating.text != ''">{{rating.text}}</p>
                <p class="text" v-show="rating.text == ''">该客人没有发表评论</p>
                <div class="recommend">
                  <i
                    class="iconfont"
                    :class="{'icon-dianzan':rating.rateType === 0,'icon-cai':rating.rateType === 1}"
                  ></i>
                  <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                </div>
                <div class="time">{{ format(rating.rateTime) }}</div>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!ratings || !ratings.length">该商品暂无评价！</div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import ratingselect from "../ratingselect/ratingselect";
import star from "../star/star";
import split from "../split/split";
import moment from "moment";

const POSITIVE = 0;
const NEGOTIVE = 1;
const ALL = 2;

export default {
  name: "ratings",
  props: {
    data: {
      type: Object
    }
  },

  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      // 评论要显示的评论类型
      ratingType: ALL,
      // 筛选有无论评内容展示
      isOnlyContent: false
    };
  },

  created() {
    this.getRatingsData();
  },

  methods: {
    getRatingsData() {
      this.axios
        //.get("http://moxinhuo.easy.echosite.cn/static/data.json")
        .get("/api/ratings")
        .then(response => {
          this.ratings = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 判断评论是否能被展示
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
    ratingselect: ratingselect,
    star: star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratings {
  position: relative;
  height: 100%;

  .ratings-content {
    font-size: 0;

    .overview {
      padding: 18px 24px 18px 0;
      display: flex;

      .overview-left {
        flex: 0 0 138px;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.3);

        .score {
          font-size: 24px;
          color: rgb(255, 153, 0);
          line-height: 28px;
          margin-bottom: 6px;
        }

        .text {
          font-weight: 700;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 12px;
          margin-bottom: 8px;
        }

        .rank-rate {
          font-size: 10px;
          color: rgb(7, 17, 27);
          line-height: 10px;
          margin-bottom: 6px;
        }
      }

      .overview-right {
        flex: 1;
        margin-left: 24px;
        font-size: 0;

        .score-wrapper {
          margin-bottom: 8px;

          .text {
            display: inline-block;
            vertical-align: top;
            font-weight: 700;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
            margin-right: 12px;
          }

          .star-wrapper {
            display: inline-block;
            font-weight: 700;
            margin-right: 10px;
            vertical-align: top;
          }

          .service-score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
            line-height: 18px;
          }
        }

        .delivery-wrapper {
          .text {
            font-size: 12px;
            font-weight: 700;
            color: rgb(7, 17, 27);
            line-height: 18px;
            margin-right: 12px;
          }

          .delivery-time {
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 18px;
          }
        }
      }
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;

          img {
            border-radius: 50%;
          }
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }

          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;

            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }

            .delivery {
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }

          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
            white-space: normal;
          }

          .recommend {
            line-height: 16px;
            font-size: 0;

            .iconfont {
              display: inline-block;
              vertical-align: top;
              font-size: 16px;
              line-height: 16px;
              margin-right: 4px;

              &.icon-dianzan {
                color: rgb(0, 160, 220);
              }

              &.icon-cai {
                color: rgb(147, 153, 159);
              }
            }

            .item {
              padding: 0 6px;
              margin-right: 2px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
              font-size: 10px;
              white-space: normal;
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>