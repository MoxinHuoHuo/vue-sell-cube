<template>
  <transition name="fade">
    <div class="header-detail" v-show="visible">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
              <supportIco :size="2" :type="item.type"></supportIco>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="bulletin-title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin-content">
            <span class="text">{{seller.bulletin}}</span>
          </div>
        </div>
        <div class="detail-close" @click="close">
          <i class="iconfont icon-close-circle"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import supportIco from "../support-icon/support-icon";
import star from "../star/star";

export default {
  name: "header-detail",
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  },
  components: {
    supportIco: supportIco,
    star: star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url('//at.alicdn.com/t/font_1279978_0450jmbmp0ga.css');
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.header-detail {
  position: fixed;
  color: #FFF;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: $color-background-s;
  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    background: $color-background
  }

  .detail-wrapper {
    padding: 64px 36px 32px 36px;

    .detail-main {
      .name {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
      }

      .star-wrapper {
        margin-top: 16px;
        margin-bottom: 28px;
        text-align: center;
      }

      .title {
        display: flex;
        margin: 28px auto 24px auto;

        .line {
          flex: 1;
          position: relative;
          top: -14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text {
          padding: 0 12px;
          font-size: 14px;
          line-height: 28px;
          font-weight: 700;
        }
      }

      .supports {
        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;

          &:last-child {
            margin-bottom: 0;
          }

          .support-ico {
            margin-right: 6px;
          }

          .text {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            font-weight: 200;
            line-height: 16px;
          }
        }
      }

      .bulletin-title {
        display: flex;
        margin: 28px auto 24px auto;

        .line {
          position: relative;
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          bottom: 6px;
        }

        .text {
          padding: 0 12px;
          font-size: 14px;
          line-height: 14px;
          font-weight: 700;
        }
      }

      .bulletin-content {
        margin: 0 auto;

        .text {
          display: inline-block;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
        }
      }
    }
  }

  .detail-close {
    position: fixed;
    bottom: 32px;
    text-align: center;
    left: 47%;

    .icon-close-circle {
      font-size: 36px;
    }
  }
}
</style>
