<template>
  <div
    class="loading_mask center"
    :style="{ background: props.maskColor }"
    v-if="show"
  >
    <slot>
      <div class="loading_block center" :style="{ background: props.bgColor }">
        <div class="icon"></div>
        <span class="title">loading...</span>
      </div>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  maskColor: {
    type: String,
    default: "rgba(0,0,0,0.6)",
  },
  bgColor: {
    type: String,
    default: "rgba(0,0,0,0.9)",
  },
});
</script>

<style lang="scss" scoped>
.loading_mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3000;
  .loading_block {
    flex-direction: column;
    width: 34.93vw;
    height: 27.47vw;
    border-radius: 2.13vw;
    z-index: 2999;
    .icon {
      width: 8.8vw;
      height: 8.8vw;
      background: url("@/assets/loading/cur_icon_loading.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      animation-name: circle;
      animation-duration: 1.2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    .title {
      font-size: 4vw;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 3.73vw;
    }
  }
}
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
