<!--
  ============================================================
  加载遮罩 LoadingMask 组件
  
  功能说明：
    对 ElementUI v-loading 指令的二次封装，提供区域级与全屏级两种加载遮罩
    默认覆盖插槽内容形成局部刷新占位，开启 fullscreen 后调用 Loading 服务覆盖整屏
    支持自定义提示文字、背景与加载图标，统一项目内的加载反馈体验
  
  Props:
    loading: Boolean - 是否显示遮罩，默认 false
    text: String - 加载提示文字，默认「加载中…」
    fullscreen: Boolean - 是否全屏遮罩，默认 false
    background: String - 遮罩背景色，默认 rgba(255,255,255,.9)
    spinner: String - 自定义加载图标类名
  
  Events:
    无
  
  适用场景：
    - 局部区域异步刷新占位
    - 表单提交 / 批量操作等待
    - 整页初始化加载
  
  wjs created by 2023-08-17
  ============================================================
-->
<template>
  <div
    class="wjs-loading-mask"
    :class="{ 'is-fullscreen-host': fullscreen }"
    v-loading="!fullscreen && loading"
    :element-loading-text="text"
    :element-loading-background="background"
    :element-loading-spinner="spinner"
  >
    <slot />
  </div>
</template>

<script>
/**
 * LoadingMask 加载遮罩组件
 *
 * 区域级使用 v-loading 指令覆盖插槽内容；全屏级使用 this.$loading 服务。
 *
 * @property {Boolean} loading - 是否显示
 * @property {String} text - 提示文字
 * @property {Boolean} fullscreen - 是否全屏
 * @property {String} background - 遮罩背景
 * @property {String} spinner - 自定义图标
 *
 * wjs created by 2023-08-17
 */
export default {
  name: 'LoadingMask',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '加载中…'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: 'rgba(255, 255, 255, 0.9)'
    },
    spinner: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loadingInstance: null
    }
  },
  watch: {
    loading() {
      this.syncFullscreen()
    },
    fullscreen() {
      this.syncFullscreen()
    }
  },
  mounted() {
    this.syncFullscreen()
  },
  beforeDestroy() {
    this.closeFullscreen()
  },
  methods: {
    // 全屏模式：使用 Loading 服务创建/关闭整屏遮罩
    syncFullscreen() {
      if (this.fullscreen && this.loading) {
        if (!this.loadingInstance) {
          this.loadingInstance = this.$loading({
            fullscreen: true,
            text: this.text,
            background: this.background,
            spinner: this.spinner || undefined
          })
        }
      } else {
        this.closeFullscreen()
      }
    },
    closeFullscreen() {
      if (this.loadingInstance) {
        this.loadingInstance.close()
        this.loadingInstance = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wjs-loading-mask {
  display: block;
  width: 100%;

  // 全屏模式下宿主本身不额外占位，仅作为内容容器
  &.is-fullscreen-host {
    display: contents;
  }
}
</style>
