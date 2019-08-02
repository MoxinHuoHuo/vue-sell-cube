<template>
  <span class="bubble">{{num}}</span>
</template>

<script type="text/ecmascript-6">
export default {
  name: "bubble",
  props: {
    num: {
      type: Number
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.bubble {
  font-size: 9px;
  border-radius: 16px;
  font-weight: 700;
  line-height: 16px;
  width: 12px;
  bottom: 40px;
  left: 32px;
  color: rgb(255, 255, 255);
  z-index: 60;
  padding: 0 6px;
  background-color: rgb(240, 20, 20);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
}
</style>
