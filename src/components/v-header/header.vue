<template>
  <div class="header border-1px">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="shangjia.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ shangjia.name }}</span>
        </div>
        <div class="description">{{ shangjia.description }}/{{ shangjia.deliveryTime }}分钟送达</div>
        <div v-if="shangjia.supports" class="support">
          <supportIco :size="1" :type="shangjia.supports[0].type"></supportIco>
          <span class="text">{{ shangjia.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="shangjia.supports" class="supports-count" @click="showDetail">
        <span class="count">{{ shangjia.supports.length }}个</span>
        <span class="icon-right">></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ shangjia.bulletin }}</span>
      <span class="bulletin-right">></span>
    </div>
    <div class="background">
      <img :src="shangjia.avatar" width="100%" height="100%" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import supportIco from "../support-icon/support-icon";

export default {
  name: "v-header",
  props: {
    shangjia: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.headerDetailComp =
      this.headerDetailComp ||
      this.$createHeaderDetail({
        $props: {
          seller: 'shangjia'
        }
      });
  },
  methods: {
    showDetail() {
      this.headerDetailComp.show();
    }
  },
  components: {
    supportIco: supportIco
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
// @import "~@/common/stylus/icon.styl";
@import url('//at.alicdn.com/t/font_1279978_0450jmbmp0ga.css');
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.header {
  overflow: hidden;
  position: relative;
  color: #FFF;
  background: $color-background-ss;

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    // 如果子元素没有设置font-size则会继承父元素的font-size设置
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      padding-left: 16px;

      .title {
        margin: 2px 0 8px 0px;

        .brand {
          // 行内元素指明宽高是无效的
          vertical-align: top;
          display: inline-block;
          width: 30px;
          height: 18px;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          vertical-align: top;
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .support {
        .support-ico {
          margin-right: 6px;
        }

        .text {
          vertical-align: top;
          font-size: 12px;
          line-height: 12px;
        }
      }
    }

    .supports-count {
      display: inline-block;
      position: absolute;
      right: 12px;
      bottom: 18px;
      height: 24px;
      padding: 0 8px;
      text-align: center;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);

      .count {
        display: inline-block;
        padding-top: 6px;
        font-size: 10px;
        font-weight: 200;
        line-height: 12px;
        margin-right: 2px;
      }

      .icon-right {
        display: inline-block;
        line-height: 12px;
        font-weight: 300;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    background-color: $color-background-sss;
    height: 28px;
    padding: 0 12px 0 12px;

    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      margin-top: 8px;
    }

    .bulletin-text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
      width: 85%;
      margin: 0 4px;
      font-size: 10px;
      font-weight: 200;
      line-height: 28px;
    }

    .bulletin-right {
      position: absolute;
      display: inline-block;
      line-height: 28px;
      font-weight: 300;
      font-size: 10px;
      right: 12px;
      bottom: 0px;
    }
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0px;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: $color-background-s;

    .detail-wrapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;

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
          width: 80%;
          margin: 28px auto 24px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .text {
            padding: 0 12px;
            font-size: 14px;
            line-height: 28x;
            font-weight: 700;
          }
        }

        .supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;

            &:last-child {
              margin-bottom: 0;
            }

            .icon {
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
          width: 80%;
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
          width: 80%;
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
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;

      .icon-close-circle {
        font-size: 32px;
      }
    }
  }
}
</style>
