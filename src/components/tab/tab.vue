<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabelSlots"
      :show-slider="true"
      :data="tabs"
      :useTransition="false"
      ref="tabBar"
      class="border-bottom-1px"
    ></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        ref="slide"
        @change="onChange"
        :options="slideOptions"
        @scroll="onScroll"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import goods from "../goods/goods";
import ratings from "../ratings/ratings";
import seller from "../seller/seller";

export default {
  name: "tab",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      index: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    };
  },
  mounted() {
    this.onChange(this.index);
  },
  methods: {
    onChange(current) {
      this.index = current;
      const component = this.$refs.component[current];
      component.fetch && component.fetch();
    },
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth;
      const slideWidth = this.$refs.slide.slide.scrollerWidth;
      const transform = (-pos.x / slideWidth) * tabBarWidth;
      this.$refs.tabBar.setSliderTransform(transform);
    }
  },
  computed: {
    // 返回当前区域所在的区域
    selectedLabelSlots: {
      // 取值
      get() {
        return this.tabs[this.index].label;
      },
      set(newVal) {
        // 接下来要设置的值
        this.index = this.tabs.findIndex(value => {
          // value是Object类型，用来遍历数组，碰到符合条件则返回对应Object的索引值
          return value.label === newVal;
        });
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.tab {
  >>> .cube-tab {
    padding: 10px 0;
  }

  display: flex;
  flex-direction: column;
  height: 100%;

  .slide-wrapper {
    flex: 1;
    overflow: hidden;
  }
}
</style>