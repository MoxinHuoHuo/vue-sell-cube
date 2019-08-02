<template>
  <div class="rating-select-wrapper">
    <div class="rating-type">
      <div class="all" :class="{'current':selectType === 2}" @click="activate(2)">
        <span>{{ desc.all }}</span>
        <span>{{ ratings.length }}</span>
      </div>
      <div class="positive" :class="{'current':selectType === 0}" @click="activate(0)">
        <span class="text">{{ desc.positive }}</span>
        <span class="count">{{positiveCount}}</span>
      </div>
      <div class="negative" :class="{'current':selectType === 1}" @click="activate(1)">
        <span>{{ desc.negative }}</span>
        <span>{{negativeCount}}</span>
      </div>
    </div>
    <div class="switch">
      <i
        class="iconfont icon-circle-check"
        :class="{'active':onlyContent === true}"
        @click="selectNotNull()"
      ></i>
      <div class="text">查看只有内容的评价</div>
    </div>
    <div class="rating-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },

  computed: {

    positiveCount() {
      let count = 0;
      for (let index = 0; index < this.ratings.length; index++) {
        const rating = this.ratings[index];
        if (rating.rateType === POSITIVE) {
          count++;
        }
      }
      return count;
    },

    negativeCount() {
      let count = 0;
      for (let index = 0; index < this.ratings.length; index++) {
        const rating = this.ratings[index];
        if (rating.rateType === NEGATIVE) {
          count++;
        }
      }
      return count;
    }
  },

  data() {
    return {
      selectType: ALL,
      onlyContent: false
    };
  },

  methods: {
    initStatus() {
      this.selectType = ALL;
      this.onlyContent = false;
    },

    activate(type) {
      this.selectType = type;
      this.$emit("select-type", this.selectType);
    },

    selectNotNull() {
      this.onlyContent = !this.onlyContent;
      this.$emit("only-content", this.onlyContent);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url('//at.alicdn.com/t/font_1279978_znaqr6h33rn.css');
@import '~@/common/stylus/mixin.styl';

.rating-select-wrapper {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    border-1px(rgba(7, 17, 27, 0.1));

    .all {
      display: inline-block;
      margin-right: 8px;
      font-size: 12px;
      padding: 0px 10px;
      text-align: center;
      background: rgba(0, 160, 220, 0.2);
      line-height: 32px;
      border-radius: 4px;

      &.current {
        background: rgb(0, 160, 220);
      }
    }

    .positive {
      display: inline-block;
      margin-right: 8px;
      font-size: 12px;
      padding: 0px 10px;
      text-align: center;
      line-height: 32px;
      border-radius: 4px;
      background: rgba(0, 160, 220, 0.2);

      &.current {
        background: rgb(0, 160, 220);
      }
    }

    .negative {
      display: inline-block;
      font-size: 12px;
      padding: 0px 10px;
      text-align: center;
      line-height: 32px;
      border-radius: 4px;
      background: rgba(77, 85, 93, 0.2);

      &.current {
        background: rgba(77, 85, 93, 0.7);
      }
    }
  }

  .switch {
    padding: 12px 18px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.2);

    .icon-circle-check {
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      color: rgb(147, 153, 159);
      line-height: 48px;
      margin-right: 4px;

      &.active {
        color: rgba(105, 238, 17, 0.8);
      }
    }

    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 48px;
    }
  }
}
</style>
